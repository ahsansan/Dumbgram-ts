import "./createpost.css";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
// @ts-ignore
import Aos from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

interface FormDataIn {
  fileName: any[];
  idUser: string;
  caption: string;
}

function CreatePost() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [state, dispatch] = useContext(UserContext);
  parseInt(`${state.user.id}`);

  const [preview, setPreview] = useState<string>("");

  const [form, setForm] = useState<FormDataIn>({
    fileName: [],
    idUser: `${state.user.id}`,
    caption: "",
  });

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

  const textareaOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("fileName", form.fileName[0], form.fileName[0].name);
      formData.set("idUser", form.idUser);
      formData.set("caption", form.caption);

      await API.post("/feed", formData, config);

      const response = await API.get("/check-auth");

      Swal.fire("Good job!", "Upload Success", "success");

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

  return (
    <div className="create-post-container" data-aos="fade-up">
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        {preview && (
          <img src={preview} className="img-fluid rounded" width="40%" />
        )}
        <div>
          <label
            htmlFor="input-photo-video"
            className="post-upload-photo-button"
          >
            <p>Upload Photos or Video</p>
          </label>
          <input
            type="file"
            id="input-photo-video"
            onChange={handleOnChange}
            name="fileName"
            hidden
          />
        </div>
        <div>
          <input
            type="hidden"
            onChange={handleOnChange}
            name="idUser"
            placeholder="userFeed"
          />
          <textarea
            name="caption"
            id="caption"
            className="caption-textarea"
            onChange={textareaOnChange}
            placeholder="Caption"
          ></textarea>
        </div>
        <div className="upload-button-container">
          <button type="submit" className="upload-button">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
