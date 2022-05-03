import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import DumbGramLogo from "../../assets/DumbGram.png";

const Welcome = () => {
  // login
  const [isOpenLogin, setOpenLogin] = useState<boolean>(false);
  const handleLogin = (value: boolean): void => setOpenLogin(value);

  // register
  const [isOpenRegister, setOpenRegister] = useState<boolean>(false);
  const handleRegister = (value: boolean): void => setOpenRegister(value);

  return (
    <div>
      <img src={DumbGramLogo} alt="DumbGram" />
      <h2>Share your best photos or videos</h2>
      <p>
        Join now, share your creations with another people and enjoy other
        creation.
      </p>
      <div className="lp-tombol">
        <div>
          <p>
            <button
              className="login-auth-button"
              onClick={() => handleLogin(true)}
            >
              Login
            </button>{" "}
            <button
              className="register-auth-button"
              onClick={() => handleRegister(true)}
            >
              Register
            </button>
          </p>
          {isOpenLogin && (
            <Login
              isOpen={isOpenLogin}
              isClose={() => handleLogin(false)}
              isOpenRegister={() => handleRegister(true)}
            />
          )}
          {isOpenRegister && (
            <Register
              isOpen={isOpenRegister}
              isClose={() => handleRegister(false)}
              isOpenLogin={() => handleLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
