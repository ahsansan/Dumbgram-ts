// @ts-ignore
import Masonry from "react-responsive-masonry";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";
import "./feed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
import FeedData from "../../types/feedData";
import DetailFeed from "./DetailFeed";
const path: string = "https://dumbgram-be-ahsan.herokuapp.com/uploads/";

const FeedProfile = () => {
  const { id } = useParams();
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // Detail Feed Modal
  const [state] = useContext(UserContext);
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  // feed by id
  const [feeds, setFeeds] = useState<FeedData[]>([]);
  const [feedsId, setFeedId] = useState<FeedData>();
  // load Feed
  const showFeedFollow = async () => {
    try {
      const response = await API.get(`/feedscount/${id}`);
      setFeeds(response.data.data.feeds);
    } catch (error) {
      console.log(error);
    }
  };
  // order feed
  feeds.reverse();

  const handleLike = (event: any) => {
    const id: number = event.target.getAttribute("content");
    like(id);
  };

  const like = async (id: number) => {
    try {
      const body = JSON.stringify({ id });
      const headers = {
        headers: { "Content-Type": "application/json" },
      };
      await API.post("/like", body, headers);

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
    <div>
      {feeds.length > 0 ? (
        <div data-aos="fade-up">
          <Masonry columnsCount={3}>
            {feeds.map((feed) => (
              <div
                className="feed-container"
                key={feed.id}
                onClick={() => setFeedId(feed)}
              >
                <div className="feed-gambar">
                  <img
                    alt="Gambar Feed"
                    src={process.env.PUBLIC_URL + path + `${feed.fileName}`}
                    onClick={handleShow}
                    className="images-feed"
                  />
                </div>
                <div className="feed-keterangan">
                  <div className="prof-box">
                    <div className="profile">
                      <img
                        src={
                          process.env.PUBLIC_URL + path + `${feed.user.image}`
                        }
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
                          //   @ts-ignore
                          content={feed.id}
                        />
                      ) : feed.likers.length === 0 ? (
                        <FontAwesomeIcon
                          className="card-icon"
                          onClick={handleLike}
                          icon={faHeart}
                          //   @ts-ignore
                          content={feed.id}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="card-icon"
                          onClick={handleLike}
                          icon={faHeart}
                          //   @ts-ignore
                          content={feed.id}
                        />
                      )}
                      <FontAwesomeIcon
                        className="card-icon"
                        icon={faComment}
                        onClick={handleShow}
                      />
                      <FontAwesomeIcon
                        className="card-icon"
                        icon={faPaperPlane}
                      />
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
      ) : (
        <div className="feed-kosong">
          <div className="nopost" data-aos="fade-up">
            <h3>No Post</h3>
            <p className="childnopost">you don't have any post</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedProfile;
