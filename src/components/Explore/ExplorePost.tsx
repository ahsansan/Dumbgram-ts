// @ts-ignore
import Masonry from "react-responsive-masonry";
import "./explore.css";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import DetailFeed from "../Feed/DetailFeed";
import { API } from "../../config/api";
import FeedData from "../../types/feedData";
// path
const path: string = "https://dumbgram-be-ahsan.herokuapp.com/uploads/";

function ExplorePost() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // Detail Feed Modal
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);
  // follow feed
  const [explore, setExplore] = useState<FeedData[]>([]);
  const [feedsId, setFeedId] = useState<FeedData>();
  // load Feed
  const showFeedFollow = async () => {
    try {
      const response = await API.get(`/feeds`);
      setExplore(response.data.data.feeds); // id
    } catch (error) {
      console.log(error);
    }
  };
  // order feed
  function shuffleArray(explore: FeedData[]) {
    let i = explore.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = explore[i];
      explore[i] = explore[j];
      explore[j] = temp;
    }
    return explore;
  }

  const shuffledPosts = shuffleArray(explore);

  // Load loadFeedFollow
  useEffect(() => {
    showFeedFollow();
  }, []);

  return (
    <div data-aos="fade-up">
      <Masonry columnsCount={3}>
        {shuffledPosts.map((feed) => (
          <div
            className="explore-post-container"
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
  );
}

export default ExplorePost;
