import Profile from "../components/Profile/Profile";
import Header from "../components/Header/Header";
import FeedProfile from "../components/Feed/FeedProfile";
import LeftMenu from "../components/Profile/LeftMenu";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  // Context
  const [state] = useContext(UserContext);

  const { id } = useParams();
  const yourId = state.user.id;
  const profilePage = id;

  useEffect(() => {
    document.title = "Profile | Dumbgram";
  });

  return (
    <div>
      <Header />
      <div className="nav-container">
        {yourId == profilePage ? (
          <div className="home-left">
            <LeftMenu />
          </div>
        ) : (
          <div className="home-left">
            <Profile />
          </div>
        )}
        <div className="home-right">
          <div>
            <FeedProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
