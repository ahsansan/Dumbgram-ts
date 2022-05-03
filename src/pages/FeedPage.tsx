import LeftMenu from "../components/Profile/LeftMenu";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import { useEffect } from "react";

const FeedPage = () => {
  useEffect(() => {
    document.title = "Feeds | Dumbgram";
  });

  return (
    <div>
      <Header />
      <div className="nav-container">
        <div className="home-left">
          <LeftMenu />
        </div>
        <div className="home-right">
          <div>
            <div>
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
