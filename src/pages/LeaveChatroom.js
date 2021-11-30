import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const LeaveChatroom = ({ chatroomID }) => {
  const history = useHistory();
  const userID = useSelector((state) => state.auth.userID);

  useEffect(() => {
    console.log("In Leave Chatroom...");
  }, []);

  const leaveChatroom = () => {
    console.log(userID, "is Leaving Chatroom:", chatroomID);

    const inputCred = {
      userID: userID,
      chatroomID: chatroomID,
    };

    axios
      .post(`${process.env.REACT_APP_GET_API_KEY}leave-chatroom`, inputCred)
      .then((res) => {
        console.log("res.data:", res.data);
      })
      .catch((err) => {
        console.log("Error in Leaving Chatroom...");
        console.error(err);
      });

    history.push("/message-center");
  };

  return (
    <input
      type="button"
      value="Leave Chatroom Button"
      onClick={() => leaveChatroom()}
    />
  );
};

export default LeaveChatroom;
