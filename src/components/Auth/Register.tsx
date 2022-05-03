import { useState, FC, ChangeEvent, SyntheticEvent, ReactElement } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import "./auth.css";
import Swal from "sweetalert2";
import { API } from "../../config/api";
import RegisterForm from "../../types/registerForm";

interface Props {
  isOpen: boolean;
  isClose: () => void;
  isOpenLogin: () => void;
}

const Register: FC<Props> = ({ isOpen, isClose, isOpenLogin }) => {
  // register
  const [show, setShow] = useState(isOpen);
  const handleRegisterClose = () => {
    setShow(false);
    isClose();
  };

  // login
  const handleLoginModal = () => {
    setShow(false);
    isClose();
    isOpenLogin();
  };

  // message
  const [message, setMessage] = useState<ReactElement>();

  // data
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  // ketika di input
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
      const response = await API.post("/register", body, config);

      // jika success
      if (response.data.status == "success") {
        // ketika success
        const alert: ReactElement = (
          <Alert variant="success" className="py-2">
            Success
          </Alert>
        );
        setMessage(alert);

        // kosongkan data
        setForm({
          fullName: "",
          email: "",
          username: "",
          password: "",
        });

        handleRegisterClose();

        Swal.fire("Good job!", "Registration Success", "success");

        // jika kesalahan inputan
      } else {
        const alert: ReactElement = (
          <Alert variant="danger" className="py-2">
            Failed
          </Alert>
        );
        setMessage(alert);
      }

      // server error
    } catch (error) {
      const alert: ReactElement = (
        <Alert variant="danger" className="py-2">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <>
      {/* Modal */}
      <Modal
        dialogClassName="info-modal"
        show={show}
        onHide={handleRegisterClose}
      >
        <Modal.Body>
          <Modal.Title className="form-auth-h">Register</Modal.Title>
          {/* alert */}
          {message && message}
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                onChange={handleOnChange}
                value={form.email}
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="false"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                onChange={handleOnChange}
                value={form.fullName}
                type="text"
                name="fullName"
                placeholder="Name"
                autoComplete="false"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                onChange={handleOnChange}
                value={form.username}
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="false"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="form-auth-input"
                onChange={handleOnChange}
                value={form.password}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button className="form-auth-button" type="submit">
              Register
            </Button>
          </Form>
          <span onClick={handleLoginModal} style={{ textDecoration: "none" }}>
            <p className="form-auth-p">Already have an account? Click Here</p>
          </span>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
