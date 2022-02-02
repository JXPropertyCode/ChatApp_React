import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ChangeEmail = () => {
  const oldEmail = useRef(null);
  const newEmail = useRef(null);
  const confirmNewEmail = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector((state) => state.auth.username);
  const owner = useSelector((state) => state.auth.owner);
  const userEmail = useSelector((state) => state.auth.email);

  const resetInput = () => {
    oldEmail.current.value = "";
    newEmail.current.value = "";
    confirmNewEmail.current.value = "";
  };

  const reqChangeEmail = (e) => {
    e.preventDefault();

    if (userEmail !== oldEmail.current.value) {
      alert("Old Email Doesn't Match Your Current Email!");
      resetInput();
      return;
    }

    if (
      oldEmail.current.value === newEmail.current.value ||
      oldEmail.current.value === confirmNewEmail.current.value
    ) {
      alert("Old Email and New Emails Cannot Be The Same!");
      resetInput();
      return;
    }

    if (newEmail.current.value !== confirmNewEmail.current.value) {
      alert("New Email and Confirm New Email Doesn't Match!");
      resetInput();
      return;
    }

    let creatingCred = {
      email: userEmail,
      owner: owner,
      username: username,
      newEmail: confirmNewEmail.current.value,
    };

    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}confirm-change-email/${owner}`,
        creatingCred
      )
      .then((res) => {
        return res;
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
