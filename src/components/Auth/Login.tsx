import {
  useState,
  useContext,
  FC,
  ReactElement,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import "./auth.css";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/UserContext";
import LoginForm from "../../types/loginForm";

interface Props {
  isOpen: boolean;
  isClose: () => void;
  isOpenRegister: () => void;
}

const Login: FC<Props> = ({ isOpen, isClose, isOpenRegister }) => {
  // Login
  const [show, setShow] = useState(isOpen);
  const handleLoginClose = (): void => {
    setShow(false);
    isClose();
  };

  // Register
  const handleModalRegister = (): void => {
    setShow(false);
    isClose();
    isOpenRegister();
  };

  // Context
  const [, dispatch] = useContext(UserContext);

  // message
  const [message, setMessage] = useState<ReactElement>();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ketika tombol submit di tekan
  const handleOnSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      // Config
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Stringify
      const body = JSON.stringify(form);

      // link config
      const response = await API.post("/login", body, config);

      // jika success
      if (response.data.status == "success") {
        // ketika success
        const alert = (
          <Alert variant="success" className="py-2">
            Success
          </Alert>
        );
        setMessage(alert);

        setAuthToken(response.data.data.user.token);

        // kosongkan data
        setForm({
          email: "",
          password: "",
        });

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });

        // jika kesalahan inputan
      } else {
        const alert = (
          <Alert variant="danger" className="py-2">
            Failed
          </Alert>
        );
        setMessage(alert);
      }

      // server error
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-2">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div>
      {/* Modal */}
      <Modal dialogClassName="info-modal" show={show} onHide={handleLoginClose}>
        <Modal.Body>
          <Modal.Title className="form-auth-h">Login</Modal.Title>
          {message && message}
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                type="email"
                name="email"
                onChange={handleOnChange}
                value={form.email}
                id="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                type="password"
                name="password"
                onChange={handleOnChange}
                value={form.password}
                id="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button type="submit" className="form-auth-button">
              Login
            </Button>
          </Form>
          <span
            onClick={handleModalRegister}
            style={{ textDecoration: "none" }}
          >
            <p className="form-auth-p">Don't have an account? Click Here</p>
          </span>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
