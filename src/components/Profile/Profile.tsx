import "./profile.css";
import { Button } from "react-bootstrap";
// import NewMessage from "../Message/NewMessage";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faHome,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext, SyntheticEvent } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
import UserData from "../../types/userData";

// let socket;
interface FollowData {
  idFollowings: number;
  idFollowers: number;
}

const Profile = () => {
  // Id
  const { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState<UserData>();
  const [feed, setFeed] = useState<number>();
  const [follower, setFollower] = useState<number>();
  const [following, setFollowing] = useState<number>();
  const [follow, setFollow] = useState<FollowData[]>([]);
  const [follows, setFollows] = useState<boolean>();

  // const [show, setShow] = useState<boolean>(false);
  // const handleClose = (): void => setShow(false);
  // const handleShow = () => setShow(true);

  const showUser = async () => {
    try {
      const response = await API.get(`/user/${id}`);
      setUser(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // feed
  const loadFeed = async () => {
    try {
      const response = await API.get(`/feedscount/${id}`);
      setFeed(response.data.data.feeds.length);
    } catch (error) {
      console.log(error);
    }
  };

  // followers
  const loadFollower = async () => {
    try {
      const response = await API.get(`/followers/${id}`);
      setFollower(response.data.data.id_user.followers.length);
    } catch (error) {
      console.log(error);
    }
  };

  // followings
  const loadFollowing = async () => {
    try {
      const response = await API.get(`/followings/${id}`);
      setFollowing(response.data.data.id_user.followings.length);
    } catch (error) {
      console.log(error);
    }
  };

  // Show follow
  const showFollow = async () => {
    try {
      const response = await API.get(`/follow/${state.user.id}`);
      setFollow(response.data.follow);
    } catch (error) {
      console.log(error);
    }
  };

  const followFilter = async () => {
    try {
      // @ts-ignore
      const find = follow.find((data) => data.idFollowings == parseInt(id));
      if (find) {
        setFollows(true);
      } else {
        setFollows(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Unfollow
  const handleUnfollow = async () => {
    try {
      await API.delete(`unfollow/${id}`);
      showUser();
      showFollow();
    } catch (error) {
      console.log(error);
    }
  };

  // Follow
  const handleFollow = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify({
        idFollowers: `${state.user.id}`,
        idFollowings: id,
      });

      const notif = JSON.stringify({
        idSender: `${state.user.id}`,
        idReceiver: id,
        message: `@${state.user.username} started following you`,
      });

      await API.patch("/follow", body, config);
      await API.post("/notif", notif, config);

      showUser();
      showFollow();
    } catch (error) {
      console.log(error);
    }
  };

  // Send message
  //   const onSendMessage = (e) => {
  //     if (e.key === "Enter") {
  //       const data = {
  //         idReceiver: id,
  //         message: e.target.value,
  //       };

  //       socket.emit("send message", data);
  //       e.target.value = "";
  //       handleClose();
  //     }
  //   };

  const ifNotFollow = () => {
    Swal.fire("You must follow this user first");
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  //   useEffect(() => {
  //     socket = io("http://localhost:5000", {
  //       auth: {
  //         token: localStorage.getItem("token"),
  //       },
  //       query: {
  //         id: state.user.id,
  //       },
  //     });

  //     socket.on("new message", () => {
  //       socket.emit("load messages", id);
  //     });

  //     socket.on("connect_error", (err) => {
  //       console.error(err.message);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  useEffect(() => {
    showUser();
    loadFeed();
    loadFollower();
    loadFollowing();
    showFollow();
  }, []);

  useEffect(() => {
    followFilter();
  }, [follow]);

  return (
    <>
      <div className="container-profile">
        <div className="left-menu-container">
          <div>
            <div className="left-menu-up">
              <div className="circle">
                <img
                  src={process.env.PUBLIC_URL + `${user?.image}`}
                  alt="Profile"
                />
              </div>
              <div>
                <h2>{user?.fullName}</h2>
                <p className="username">@{user?.username}</p>
              </div>
              {follows ? (
                <div className="tombol-action">
                  <ul>
                    <li>
                      <Button
                        // onClick={handleShow}
                        className="login-messeges-button"
                      >
                        Messege
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={handleUnfollow}
                        className="login-unfollow-button"
                      >
                        Unfollow
                      </Button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="tombol-action">
                  <ul>
                    <li>
                      <Button
                        onClick={ifNotFollow}
                        className="login-messeges-button"
                      >
                        Messege
                      </Button>
                    </li>
                    <li>
                      <Button
                        onClick={handleFollow}
                        className="login-unfollow-button"
                      >
                        Follow
                      </Button>
                    </li>
                  </ul>
                </div>
              )}
              <div className="left-menu-statsprofile">
                <div className="left-menu-count">
                  <p className="head">Post</p>
                  <p className="content">{feed}</p>
                </div>
                <div className="left-menu-count-center">
                  <p className="head">Followers</p>
                  <p className="content">{follower}</p>
                </div>
                <div className="left-menu-count">
                  <p className="head">Following</p>
                  <p className="content">{following}</p>
                </div>
              </div>
            </div>
            <div className="data-diri">
              <p>{user?.bio}</p>
            </div>
            <div className="left-menu-down">
              <hr />
              <ul>
                <li>
                  <Link to="/feed">
                    <FontAwesomeIcon
                      className="icon-notifikasi"
                      icon={faHome}
                    />{" "}
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/explore">
                    <FontAwesomeIcon
                      className="icon-notifikasi"
                      icon={faCompass}
                    />{" "}
                    Explore
                  </Link>
                </li>
              </ul>
            </div>
            <div className="left-menu-down">
              <hr />
              <ul>
                <li>
                  <div className="logout" onClick={handleLogout}>
                    <FontAwesomeIcon
                      className="icon-notifikasi"
                      icon={faSignInAlt}
                    />{" "}
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <NewMessage
        sendMessage={onSendMessage}
        show={show}
        handleClose={handleClose}
      /> */}
    </>
  );
};

export default Profile;
