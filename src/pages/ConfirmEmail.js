import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect, useLocation, useParams } from "react-router-dom";

const ConfirmEmail = () => {
  const params = useParams();
  const userId = params.id;

  // A bit of state to give the user feedback while their email
  // address is being confirmed on the User model on the server.
  //   state = {
  //     confirming: true,
  //   };

  // When the component mounts the mongo id for the user is pulled  from the
  // params in React Router. This id is then sent to the server to confirm that
  // the user has clicked on the link in the email. The link in the email will
  // look something like this:
  //
  // http://localhost:3000/confirm/5c40d7607d259400989a9d42
  //
  // where 5c40d...a9d42 is the unique id created by Mongo
  useEffect(() => {
    // console.log("In Confirm Email React...");
    // console.log("userId:", userId);
    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}email/confirm/${userId}`,
        userId
      )
      .then(
        (res) =>
          // console.log("res:", res)
          res
      )
      .catch(
        (err) =>
          // console.log(err)
          err
      );
  }, []);

  return (
    <div>
      <h1>Processing account confirmation! Please try and login!</h1>
    </div>
  );
};

export default ConfirmEmail;
