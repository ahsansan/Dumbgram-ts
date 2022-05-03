import "./feed.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
import FeedData from "../../types/feedData";
import DetailFeed from "./DetailFeed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import "aos/dist/aos.css";
// @ts-ignore
import Masonry from "react-responsive-masonry";
const Aos = require("aos");

const path: string = "https://dumbgram-be-ahsan.herokuapp.com/uploads/";

const Feed = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const [state] = useContext(UserContext);
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  // follow feed
  const [feedFollow, setFeedFollow] = useState<FeedData[]>([]);
  const [feedsId, setFeedId] = useState<FeedData>();
  // load Feed
  const showFeedFollow = async () => {
    try {
      const response = await API.get(`/feed/${state.user.id}`);
      setFeedFollow(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // order feed
  feedFollow.reverse();

  const handleLike = (event: any) => {
    const idContent: number = event.target.getAttribute("content");
    like(idContent);
  };

  const like = async (id: number) => {
    try {
      const body = JSON.stringify({ id });
      const headers = {
        headers: { "Content-Type": "application/json" },
      };
      const notif = JSON.stringify({
        idSender: `${state.user.id}`,
        idReceiver: `${feedsId?.user.id}`,
        message: `@${state.user.username} liked your post`,
      });
      await API.post("/like", body, headers);
      await API.post("/notif", notif, headers);

      showFeedFollow();
    } catch (error) {
      console.log(error);
    }
  };

  // Load loadFeedFollow
  useEffect(() => {
    showFeedFollow();
  }, []);

  return (
    <div data-aos="fade-up">
      <Masonry columnsCount={3}>
        {feedFollow.map((feed) => (
          <div
            className="feed-container"
            key={feed.id}
            onClick={() => setFeedId(feed)}
          >
            <div className="feed-gambar">
              <img
                onClick={handleShow}
                alt="Gambar Feed"
                src={process.env.PUBLIC_URL + path + `${feed.fileName}`}
                className="images-feed"
              />
            </div>
            <div className="feed-keterangan">
              <div className="prof-box">
                <div className="profile">
                  <img
                    src={process.env.PUBLIC_URL + path + `${feed.user.image}`}
                    className="card-profiles"
                    alt="pp"
                  />
                  <p className="post-name">
                    <Link to={`/profile/${feed.user.id}`}>
                      {feed.user.username}
                    </Link>
                  </p>
                </div>
                <div className="icon-container">
                  {feed.likers.find((x) => x.idUser === state.user.id) ? (
                    <FontAwesomeIcon
                      className="card-icon text-danger"
                      onClick={handleLike}
                      icon={faHeart}
                      // @ts-ignore
                      content={feed.id}
                    />
                  ) : feed.likers.length === 0 ? (
                    <FontAwesomeIcon
                      className="card-icon"
                      onClick={handleLike}
                      icon={faHeart}
                      // @ts-ignore
                      content={feed.id}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="card-icon"
                      onClick={handleLike}
                      icon={faHeart}
                      // @ts-ignore
                      content={feed.id}
                    />
                  )}
                  <FontAwesomeIcon
                    onClick={handleShow}
                    className="card-icon"
                    icon={faComment}
                  />
                  <FontAwesomeIcon className="card-icon" icon={faPaperPlane} />
                </div>
              </div>
            </div>
            <div className="navlike">
              <div>
                <p className="like-total">{feed.likers.length} Likes</p>
              </div>
            </div>
          </div>
        ))}
        {feedFollow.length === 0 ? (
          <div className="feed-kosong">
            <div className="nopost" data-aos="fade-up">
              <h3>No Post</h3>
              <p className="childnopost">follow someone to view posts</p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <DetailFeed
          show={show}
          handleClose={handleClose}
          feedsId={feedsId}
          showFeedFollow={showFeedFollow}
        />
        <br />
        <br />
      </Masonry>
    </div>
  );
};

export default Feed;
