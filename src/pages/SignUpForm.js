import { useState, useRef } from "react";
import "../index.css";
import "../components/messageBox.css";
import { useHistory, Redirect } from "react-router-dom";
import AccountObject from "../model/AccountObject";
import axios from "axios";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";

const SignUpForm = () => {
  const userName = useRef(null);
  const userEmail = useRef(null);
  const userPass = useRef(null);
  const userConPass = useRef(null);
  const history = useHistory();
  const validAccount = useSelector((state) => state.auth.accountVerified);
  const [credPassError, setCredPassError] = useState(false);
  const [credEmailError, setCredEmailError] = useState(false);

  if (validAccount) {
    return <Redirect to="/message-center" />;
  }

  const encrypt = (input) => {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      input,
      process.env.REACT_APP_CRYPTO_JS_SECRET_KEY
    ).toString();
    return ciphertext;
  };

  const createAccount = async (e) => {
    e.preventDefault();

    const creatingCred = {
      username: userName.current.value,
      chatrooms: [],
      email: userEmail.current.value,
      password: userPass.current.value,
      confirmPassword: userConPass.current.value,
    };

    if (creatingCred.password === creatingCred.confirmPassword) {
      let convertData = new AccountObject(
        creatingCred.chatrooms,
        creatingCred.username,
        creatingCred.email,
        encrypt(creatingCred.password)
      );

      // console.log("convertData:", convertData);

      await axios
        .post(`${process.env.REACT_APP_GET_API_KEY}signup`, convertData)
        .then((res) => {

          console.log("res:", res)

          // console.log("res.data:", res.data)
          if (res.data.validCred === "true") {
            setCredEmailError(false);
            history.push({
              pathname: "/account-created",
              auth: true,
            });
          } else {
            setCredEmailError(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      setCredPassError(false);
    } else {
      setCredPassError(true);
    }
  };

  return (
    <div className="App">
      <form onSubmit={createAccount}>
        <div className="form-inner">
          <h2>Sign Up</h2>
          {credEmailError && <h4>Email Has Already Been Taken!</h4>}
          {credPassError && <h4>Your Passwords Do Not Match!</h4>}

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" ref={userName} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={userEmail}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={userPass}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              name="password"
              id="confirmPassword"
              ref={userConPass}
              required
            />
          </div>

          <input
            type="submit"
            className="signupButton"
            value="Create Account"
          />
          <input
            className="signupButton"
            type="button"
            value="Back to Login"
            onClick={() => {
              history.push("/login-form");
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
