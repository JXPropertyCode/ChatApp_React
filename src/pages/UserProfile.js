import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const UserProfile = () => {
  const history = useHistory();

  const validAccount = useSelector((state) => state.auth.accountVerified);
  const username = useSelector((state) => state.auth.username);
  const userID = useSelector((state) => state.auth.userID);
  const userPass = useSelector((state) => state.auth.password);
  const userEmail = useSelector((state) => state.auth.email);

  if (!validAccount) {
    return <Redirect to="/login-form" />;
  }

  const logoutButton = () => {
    // history.push("/logout");
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

      <h3>User ID: {userID}</h3>
      <h3>Username: {username}</h3>
      <h3>Email: {userEmail}</h3>
      <h3>Password: {userPass}</h3>
    </div>
  );
};

export default UserProfile;
