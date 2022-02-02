import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatroomMessages from "./ChatroomMessages";
import ChatroomLists from "./ChatroomLists";
import ChatroomMembers from "./ChatroomMembers";
import AddMembers from "./AddMembers";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LeaveChatroom from "./LeaveChatroom";

const MessageCenter = () => {
  const history = useHistory();
  const username = useSelector((state) => state.auth.username);
  const owner = useSelector((state) => state.auth.owner);
  const userEmail = useSelector((state) => state.auth.email);
  const [isValidRoom, setIsValidRoom] = useState(false);
  const validAccount = useSelector((state) => state.auth.accountVerified);
  const [currentChatroom, setCurrentChatroom] = useState("N/A");

  // gets the path variable
  const params = useParams();
  const pathname = params.roomId;

  const logoutButton = () => {
    history.push("/logout");
  };

  useEffect(() => {
    // this is just to make sure taht if the user inputs a unauthorized chatroom, it wouldn't let them access it
    const inputData = {
      email: userEmail,
      reqChatroom: pathname,
    };

    // if accessing the chatroom is not valid or doesn't belong to you, you will be sent back to your /message-center
    if (validAccount) {
      axios
        .post(
          `${process.env.REACT_APP_GET_API_KEY}user-chatroom-validation`,
          inputData
        )
        .then((res) => {
          if (res.data.auth === true) {
            setIsValidRoom(true);
          } else {
            setIsValidRoom(false);
            history.push("/message-center");
          }
        })
        .catch((err) => {
          return err;
        });
    }

    const chatroomData = {
      chatroomId: pathname,
    };

    // finds the chatroom's name by using the pathname which is the chatroom id to search the name
    // if in the message center, pathname would be undefined so this is an error handling
    if (pathname !== undefined) {
      axios
        .post(
          `${process.env.REACT_APP_GET_API_KEY}get-chatroom-name`,
          chatroomData
        )
        .then((res) => {
          setCurrentChatroom(res.data.chatroomName);
        })
        .catch((err) => {
          return err;
        });
    }
  }, []);

  if (!validAccount) {
    history.push("/login-form");
  }

  return (
    <div>
      <header>
        <h1>{username}'s Dashboard</h1>
        {validAccount && <a href={`/user-profile/${owner}`}>My Profile</a>}
        <p>userID: {owner}</p>
        <p>Current Chatroom: {currentChatroom} </p>
        {/* <p>Current Chatroom: {pathname} </p> */}
        <button onClick={logoutButton}>Logout Button</button>
      </header>

      {/* if not a valid room, such as /message-center, do not let it add anyone */}
      {isValidRoom && <AddMembers chatroomId={pathname}></AddMembers>}
      {isValidRoom && (
        <LeaveChatroom
          chatroomId={pathname}
          owner={owner}
          setIsValidRoom={setIsValidRoom}
        />
      )}
      <div className="chatDisplay">
        {validAccount && <ChatroomLists></ChatroomLists>}
        {isValidRoom && <ChatroomMessages></ChatroomMessages>}
        {isValidRoom && <ChatroomMembers chatroomId={pathname} />}
      </div>
    </div>
  );
};

export default MessageCenter;
