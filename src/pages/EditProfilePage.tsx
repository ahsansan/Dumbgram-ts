import LeftMenu from "../components/Profile/LeftMenu";
import Header from "../components/Header/Header";
import EditProfile from "../components/Profile/EditProfile";
import { useEffect } from "react";

function EditProfilePage() {
  useEffect(() => {
    document.title = "Edit Profile | Dumbgram";
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
            <div className="d-flex justify-content-center">
              <EditProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
