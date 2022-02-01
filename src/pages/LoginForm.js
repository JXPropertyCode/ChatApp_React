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
    // console.log("encrypt password:", ciphertext);
    return ciphertext;
  };

  const decrypt = (input) => {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(
      input,
      process.env.REACT_APP_CRYPTO_JS_SECRET_KEY
    );
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypt password:", originalText);
    return originalText;
  };

  const login = async (inputCred) => {
    return await axios
      .post(`${process.env.REACT_APP_GET_API_KEY}login-validation`, inputCred)
      .then((res) => {
        // console.log("res.data:", res.data);

        if (res.data.validCred === "true") {
          inputCred.username = res.data.username;
          inputCred.owner = res.data.owner;
          setInvalidCred(false);
          dispatch({ type: "auth/login", payload: inputCred });
          return true;
          // if (res.data.confirmed === "true") {
          //   // console.log("res.data:", res.data);
          //   // I added a new key and value to teh inputcred, the username is from the database and inserted to the inputCred so the Store has the username of the user
          //   inputCred.username = res.data.username;
          //   inputCred.owner = res.data.owner;

          //   // console.log("Success! Account Found:", inputCred);

          //   // console.log(
          //   //   "res.data.username found in database:",
          //   //   res.data.username
          //   // );

          //   // console.log("Transferring Data onto Auth Store:", res.data);

          //   setInvalidCred(false);
          //   dispatch({ type: "auth/login", payload: inputCred });
          //   return true;
          // } else {
          //   // this is for if the account is created but they haven't confirmed it
          //   alert(
          //     "Account Has Not Been Confirmed! Re-sending Confirmation Email! Please Check Your Email!"
          //   );

          //   const convertData = {
          //     email: emailCred.current.value,
          //   };

          //   // attempt to send email
          //   // axios
          //   //   .post(`${process.env.REACT_APP_GET_API_KEY}email`, convertData)
          //   //   .then((res) => {
          //   //     // console.log("res from email:", res);
          //   //   });

          //   setInvalidCred(true);
          //   return false;
          // }
        } else {
          setInvalidCred(true);
          return false;
        }
      })
      .catch((err) => {
        // console.error(err);
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
    // console.log("inputCred to Login:", inputCred);

    const loginValid = await login(inputCred);

    if (loginValid === true) {
      // console.log("loginValid:", loginValid);
      history.push("/login-success");
    }
  };

  const handleFailure = (result) => {
    console.log("result:", result);
    // alert(result);
  };

  const handleLogin = async (googleData) => {
    console.log("googleData:", googleData);
    // all requests goes to "proxy":"http://192.168.4.25:8000/" from package.json
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log("data:", data);

    if (data.validCred === "true") {
      const inputCred = {
        username: data.username,
        owner: data.owner,
        email: data.email,
      };
      setInvalidCred(false);
      dispatch({ type: "auth/login", payload: inputCred });
      history.push("/login-success");
    }
  };
  // setLoginData(data);
  // localStorage.setItem("loginData", JSON.stringify(data));

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

          {/* Log In Button */}
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
