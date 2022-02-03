import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import GoogleLogin from "react-google-login";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [invalidCred, setInvalidCred] = useState(false);
  const emailCred = useRef(null);
  const passCred = useRef(null);

  const encrypt = (input) => {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      input,
      process.env.REACT_APP_CRYPTO_JS_SECRET_KEY
    ).toString();
    return ciphertext;
  };

  const login = async (inputCred) => {
    return await axios
      .post(`${process.env.REACT_APP_GET_API_KEY}login-validation`, inputCred)
      .then((res) => {
        // console.log("res:", res);
        if (res.data.validCred === "true") {
          inputCred.username = res.data.username;
          inputCred.owner = res.data.owner;
          setInvalidCred(false);
          dispatch({ type: "auth/login", payload: inputCred });
          return true;
        } else {
          setInvalidCred(true);
          return false;
        }
      })
      .catch((err) => {
        return false;
      });
  };

  const submitHandler = async (e) => {
    // prevent re-renders
    e.preventDefault();
    const inputCred = {
      email: emailCred.current.value,
      password: encrypt(passCred.current.value),
    };

    // doesn't need ex. emailCred.current['email'].value to access the value since its useRef() is not nested on a Form like MessageCenter's prepmessage
    const loginValid = await login(inputCred);

    // console.log("inputCred:", inputCred);

    if (loginValid === true) {
      history.push("/login-success");
    }
  };

  const handleFailure = (result) => {
    console.log("result:", result);
  };

  const handleLogin = async (googleData) => {
    // console.log("googleData:", googleData);
    // all requests goes to "proxy":"http://192.168.4.25:8000/" from package.json
    // const res = await fetch("/api/google-login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     token: googleData.tokenId,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    const inputCred = {
      token: googleData.tokenId,
    };

    const res = await axios
      .post(`${process.env.REACT_APP_GET_API_KEY}api/google-login`, inputCred)
      .then((res) => {
        // console.log("res:", res);
        return res;
      })
      .catch((err) => {
        return err;
      });

    const data = await res;

    // console.log("data:", data);
    // console.log("data:", JSON.stringify(data));
    if (data.data === undefined) {
      alert("Error with Google Login");
      return;
    }

    if (data.data.validCred === "true") {
      console.log("data.validCred:", data.data.validCred);
      const inputCred = {
        username: data.data.username,
        owner: data.data.owner,
        email: data.data.email,
      };
      setInvalidCred(false);
      dispatch({ type: "auth/login", payload: inputCred });
      history.push("/login-success");
    }
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <div className="form-inner">
          <h2>Login</h2>

          {invalidCred && (
            <div className="invalidCred">Login Details Do Not Match</div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailCred}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passCred}
              required
            />
          </div>

          <input type="submit" value="LOGIN" />
          <input
            type="button"
            className="signupButton"
            onClick={() => {
              history.push("/signup-form");
            }}
            value="SIGN UP"
          />
        </div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      </form>
    </div>
  );
};

export default LoginForm;
