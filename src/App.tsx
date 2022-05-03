import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { API, setAuthToken } from "./config/api";

// Import Page
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import EditProfilePage from "./pages/EditProfilePage";
// import MessagesPage from "./pages/MessagesPage";

// init token pada axios setiap kali aplikasi direfresh
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  // ketika reload jika masih login
  useEffect(() => {
    if (state.isLogin == false) {
      navigate("/");
    } else {
      navigate("/feed");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // loading data

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      {/* landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/create-post" element={<CreatePostPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      {/* <Route exact path="/message" element={<MessagesPage />} /> */}
    </Routes>
  );
};

export default App;
