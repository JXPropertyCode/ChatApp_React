import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

const ChangeEmail = () => {
  const oldEmail = useRef(null);
  const newEmail = useRef(null);
  const confirmNewEmail = useRef(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const validAccount = useSelector((state) => state.auth.accountVerified);
  const username = useSelector((state) => state.auth.username);
  const owner = useSelector((state) => state.auth.owner);
  const userPass = useSelector((state) => state.auth.password);
  const userEmail = useSelector((state) => state.auth.email);

  const resetInput = () => {
    // e.preventDefault();
    oldEmail.current.value = "";
    newEmail.current.value = "";
    confirmNewEmail.current.value = "";
  };

  const reqChangeEmail = (e) => {
    e.preventDefault();
    // console.log("oldEmail.current.value:", oldEmail.current.value);
    // console.log("newEmail.current.value:", newEmail.current.value);
    // console.log(
    //   "confirmNewEmail.current.value:",
    //   confirmNewEmail.current.value
    // );

    if (userEmail !== oldEmail.current.value) {
      alert("Old Email Doesn't Match Your Current Email!");
      return;
    }

    if (
      oldEmail.current.value === newEmail.current.value ||
      oldEmail.current.value === confirmNewEmail.current.value
    ) {
      alert("Old Email and New Emails Cannot Be The Same!");
      return;
    }

    if (newEmail.current.value !== confirmNewEmail.current.value) {
      alert("New Email and Confirm New Email Doesn't Match!");
      return;
    }

    // console.log("Email Request Valid...");

    let creatingCred = {
      email: userEmail,
      owner: owner,
      username: username,
      userPass: userPass,
      newEmail: confirmNewEmail.current.value,
    };

    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}confirm-change-email/${owner}`,
        creatingCred
      )
      .then((res) => {
        // console.log("res from email:", res);
        return res
      });

    dispatch({ type: "auth/changeEmail", payload: creatingCred });

    history.push("/login-form");
    return;
  };

  return (
    <div className="App">
      <form onSubmit={reqChangeEmail}>
        <div className="form-inner">
          <h2>Request To Change Email</h2>
          <div className="form-group">
            <label htmlFor="email">Current Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={oldEmail}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">New Email:</label>
            <input
              type="email"
              name="newEmail"
              id="newEmail"
              ref={newEmail}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Confirm New Email:</label>
            <input
              type="email"
              name="confirmNewEmail"
              id="confirmNewEmail"
              ref={confirmNewEmail}
              required
            />
          </div>

          <input
            type="submit"
            className="signupButton"
            value="Confirm Email Change"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeEmail;
