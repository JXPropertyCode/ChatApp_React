import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const oldPassword = useRef(null);
  const newPassword = useRef(null);
  const confirmNewPassword = useRef(null);

  const history = useHistory();

  const dispatch = useDispatch()

  const validAccount = useSelector((state) => state.auth.accountVerified);
  const username = useSelector((state) => state.auth.username);
  const owner = useSelector((state) => state.auth.owner);
  const userPass = useSelector((state) => state.auth.password);
  const userEmail = useSelector((state) => state.auth.email);

  const resetInput = () => {
    // e.preventDefault();
    oldPassword.current.value = "";
    newPassword.current.value = "";
    confirmNewPassword.current.value = "";
  };

  const reqChangePassword = (e) => {
    e.preventDefault();
    console.log("oldPassword.current.value:", oldPassword.current.value);
    console.log("newPassword.current.value:", newPassword.current.value);
    console.log(
      "confirmNewPassword.current.value:",
      confirmNewPassword.current.value
    );

    if (userPass !== oldPassword.current.value) {
      alert("Old Password Doesn't Match Your Current Password!");
      return;
    }

    if (
      oldPassword.current.value === newPassword.current.value ||
      oldPassword.current.value === confirmNewPassword.current.value
    ) {
      alert("Old Password and New Password Cannot Be The Same!");
      return;
    }

    if (newPassword.current.value !== confirmNewPassword.current.value) {
      alert("New Password and Confirm New Password Doesn't Match!");
      return;
    }

    console.log("Password Request Valid...");

    let creatingCred = {
      email: userEmail,
      owner: owner,
      username: username,
      userPass: userPass,
      newPassword: confirmNewPassword.current.value,
    };

    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}confirm-change-password/${owner}`,
        creatingCred
      )
      .then((res) => {
        console.log("res from password:", res);
      });

    dispatch({ type: "auth/changePassword", payload: creatingCred });

    history.push("/login-form");
    return;
  };

  return (
    <div className="App">
      <form onSubmit={reqChangePassword}>
        <div className="form-inner">
          <h2>Request To Change Password</h2>
          <div className="form-group">
            <label htmlFor="password">Current Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={oldPassword}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              ref={newPassword}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm New Password:</label>
            <input
              type="password"
              name="confirmNewEmail"
              id="confirmNewEmail"
              ref={confirmNewPassword}
              required
            />
          </div>

          <input
            type="submit"
            className="signupButton"
            value="Confirm Password Change"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
