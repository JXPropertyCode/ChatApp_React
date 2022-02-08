import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const LeaveChatroom = ({ chatroomId, setIsValidRoom }) => {
  const history = useHistory();
  const owner = useSelector((state) => state.auth.owner);

  const leaveChatroom = async () => {
    const inputCred = {
      owner: owner,
      chatroomId: chatroomId,
    };

    await axios
      .post(`${process.env.REACT_APP_GET_API_KEY}leave-chatroom`, inputCred)
      .then((res) => {
        // console.log("res:", res);

        if (
          res.data.updateAccount === "Success" &&
          res.data.updateChatroom === "Success"
        ) {
          alert("Leaving Chatroom Successful...");
        } else {
          alert("Leaving Chatroom Failed...");
        }
        return res;
      })
      .catch((err) => {
        return err;
      });

    setIsValidRoom(false);
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
