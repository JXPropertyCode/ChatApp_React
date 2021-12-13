import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import "../components/userProfile.css";
import axios from "axios";

const UserProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const validAccount = useSelector((state) => state.auth.accountVerified);
  const username = useSelector((state) => state.auth.username);
  const owner = useSelector((state) => state.auth.owner);
  const userPass = useSelector((state) => state.auth.password);
  const userEmail = useSelector((state) => state.auth.email);
  const reqNewUserName = useRef(null);

  const [changeUsername, setChangeUsername] = useState(false);

  if (!validAccount) {
    return <Redirect to="/login-form" />;
  }

  const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

  const reqChangeUsername = () => {
    // console.log("reqNewUserName.current.value:", reqNewUserName.current.value);

    let strFilter = removeExtraSpace(reqNewUserName.current.value);

    if (strFilter.length === 0) {
      // console.log("Cannot Have ONLY Empty Spaces as a Username");
      return;
    }

    const inputData = {
      newUsername: strFilter,
      username: username,
      owner: owner,
      email: userEmail,
      password: userPass,
    };

    axios
      .post(`${process.env.REACT_APP_GET_API_KEY}change-username`, inputData)
      .then((res) => {
        // console.log("res:", res);
        res;
      })
      .catch((err) => {
        console.error(err);
      });

    // change the states for the user auth
    dispatch({ type: "auth/changeUsername", payload: inputData });
    setChangeUsername(false);
  };

  // this dictates when to show teh text box to submit or cancel a new name change
  const handleUsername = () => {
    setChangeUsername(!changeUsername);
  };

  const handleEmail = (e) => {
    const inputData = {
      username: username,
      owner: owner,
      email: userEmail,
      password: userPass,
    };

    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}change-email/${owner}`,
        inputData
      )
      .then((res) => {
        // console.log("res:", res);
        res;
      })
      .catch((err) => {
        console.error(err);
      });

    alert("Email has been sent to you to change your email!");
  };

  const handlePassword = (e) => {
    const inputData = {
      username: username,
      owner: owner,
      email: userEmail,
      password: userPass,
    };

    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}change-password/${owner}`,
        inputData
      )
      .then((res) => {
        // console.log("res:", res);
        res;
      })
      .catch((err) => {
        console.error(err);
      });

    alert("Email has been sent to you to change your password!");
  };

  const logoutButton = () => {
    history.push("/logout");
  };

  return (
    <div>
      <input
        type="button"
        value="Go Back to Message Center"
        onClick={() => {
          history.push("/message-center");
        }}
      />
      <h1>{username}'s Profile</h1>
      <input type="button" onClick={logoutButton} value="Logout Button" />

      <h3 className="userInfo">User ID: {owner}</h3>

      <div className="userInfo">
        <h3>Username: {username}</h3>
        {changeUsername && (
          // prevents enter from submitting which prevents re-renders too
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label>
              <input type="text" ref={reqNewUserName} />
            </label>
            <input
              type="button"
              value="Submit"
              onClick={() => reqChangeUsername()}
            />
            <input
              type="button"
              value="Cancel"
              onClick={() => handleUsername()}
            />
          </form>
        )}
        {!changeUsername && (
          <input
            type="button"
            value="Change"
            onClick={(e) => handleUsername(e)}
          />
        )}
      </div>

      <div className="userInfo">
        <h3>Email: {userEmail}</h3>
        <input
          type="button"
          value="Request Change"
          onClick={() => handleEmail()}
        />
      </div>

      <div className="userInfo">
        <h3>Password: {userPass}</h3>
        <input
          type="button"
          value="Request Change"
          onClick={() => handlePassword()}
        />
      </div>
    </div>
  );
};

export default UserProfile;
