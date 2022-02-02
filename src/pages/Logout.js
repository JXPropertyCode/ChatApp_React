import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const validAccount = useSelector((state) => state.auth.accountVerified);
  const dispatch = useDispatch();

  if (!validAccount) {
    return <Redirect to="/login-form" />;
  }

  if (validAccount === true) {
    setTimeout(() => {
      dispatch({ type: "auth/logout" });
      return <Redirect to="/login-form" />;
    }, 3000);
  }

  return (
    <div>
      <h1>Logging Out</h1>
      <h3>Redirecting to Login Page...</h3>
    </div>
  );
};

export default Logout;
