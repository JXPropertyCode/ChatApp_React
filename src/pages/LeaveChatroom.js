import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const LeaveChatroom = ({ chatroomId, setIsValidRoom }) => {
  const history = useHistory();
  const owner = useSelector((state) => state.auth.owner);

  const leaveChatroom = () => {
    // console.log(owner, "is Leaving Chatroom:", chatroomId);

    const inputCred = {
      owner: owner,
      chatroomId: chatroomId,
    };

    axios
      .post(`${process.env.REACT_APP_GET_API_KEY}leave-chatroom`, inputCred)
      .then((res) => {
        // console.log("res.data:", res.data);
        return res
      })
      .catch((err) => {
        // console.log("Error in Leaving Chatroom...");
        // console.error(err);
        return err
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
