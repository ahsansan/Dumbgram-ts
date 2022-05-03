import "./editprofile.css";
import { useContext, useState, useEffect, ChangeEvent } from "react";
import Swal from "sweetalert2";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";

interface FormEdit {
  image: any[];
  fullName: string;
  username: string;
  bio: string;
}

function EditProfile() {
  // Animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [state, dispatch] = useContext(UserContext);

  // form awal
  const [form, setForm] = useState<FormEdit>({
    image: [],
    fullName: "",
    username: "",
    bio: "",
  });

  const [prevImage, setPrevImage] = useState<string>("");

  const [preview, setPreview] = useState<string>("");

  const { image, fullName, username, bio } = form;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      // @ts-ignore
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("fullName", form.fullName);
      formData.set("username", form.username);
      formData.set("bio", form.bio);

      await API.patch(`/user/${state.user.id}`, formData, config);

      const response = await API.get("/check-auth");

      Swal.fire("Good job!", "Update Success", "success");

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

  const getUser = async () => {
    try {
      const response = await API.get(`user/${state.user.id}`);
      const user = response.data.data.user;

      setForm({
        image: [],
        fullName: user.fullName,
        username: user.username,
        bio: user.bio,
      });
      setPrevImage(user.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [state.user.id]);

  return (
    <div className="edit-profile-container" data-aos="fade-up">
      <h1>Edit Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {preview ? (
          <img src={preview} className="img-fluid rounded" width="20%" />
        ) : (
          <img src={prevImage} className="img-fluid rounded" width="15%" />
        )}
        <div>
          <label htmlFor="input-photo" className="profile-upload-photo-button">
            <p>Upload Photos</p>
          </label>
          <input
            type="file"
            id="input-photo"
            onChange={handleOnChange}
            name="image"
            hidden
          />
        </div>
        <div>
          <input
            type="text"
            name="fullName"
            id="fullName"
            onChange={handleOnChange}
            value={fullName}
            className="normal-input"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleOnChange}
            value={username}
            className="normal-input"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder="Bio"
            className="normal-input"
            onChange={handleOnChange}
            value={bio}
          />
        </div>
        <div className="save-button-container">
          <button type="submit" className="save-button">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
