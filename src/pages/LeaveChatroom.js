import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const LeaveChatroom = ({ chatroomId, setIsValidRoom }) => {
  const history = useHistory();
  const owner = useSelector((state) => state.auth.owner);

  const leaveChatroom = () => {
    const inputCred = {
      owner: owner,
      chatroomId: chatroomId,
    };

    axios
      .post(`${process.env.REACT_APP_GET_API_KEY}leave-chatroom`, inputCred)
      .then((res) => {
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
