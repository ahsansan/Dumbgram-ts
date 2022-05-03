import { useState, useEffect, useContext } from "react";
import "./notification.css";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
import NotifData from "../../types/notifData";
const path: string = "https://dumbgram-be-ahsan.herokuapp.com/uploads/";

function Notification() {
  const [state] = useContext(UserContext);

  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const [notif, setNotif] = useState<NotifData[]>([]);

  const showNotif = async () => {
    try {
      const response = await API.get(`/notif/${state.user.id}`);
      setNotif(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showNotif();
  }, []);

  return (
    <div>
      <span onClick={handleShow}>
        <FontAwesomeIcon className="icon-notifikasi" icon={faBell} />
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="info-modal-notification"
      >
        <div className="notif-container">
          {notif.slice(0, 5).map((item) => (
            <div className="notif-by-person" key={item.id}>
              <div className="notif-photo">
                <img
                  className="notif-circlement"
                  src={process.env.PUBLIC_URL + path + `${item.sender.image}`}
                  alt="Gambar Notif"
                />
              </div>
              <div className="notif-content">
                <p className="notif-person-message">{item.message}</p>
              </div>
            </div>
          ))}
          {notif.length === 0 && (
            <div className="notif-kosong">
              <div className="no-notif">
                <p>no recent notification for you</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
