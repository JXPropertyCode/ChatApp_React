import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatroomMessages from "./ChatroomMessages";
import ChatroomLists from "./ChatroomLists";
import ChatroomMembers from "./ChatroomMembers";
import AddMembers from "./AddMembers";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LeaveChatroom from "./LeaveChatroom";

const MessageCenter = () => {
  const history = useHistory();

  const username = useSelector((state) => state.auth.username);
  const userID = useSelector((state) => state.auth.userID);
  const userPass = useSelector((state) => state.auth.password);
  const userEmail = useSelector((state) => state.auth.email);
  const [isValidRoom, setIsValidRoom] = useState(false);

  const validAccount = useSelector((state) => state.auth.accountVerified);

  const location = useLocation();
  console.log("location.pathname:", location.pathname);

  const pathname = location.pathname.replace("/message-center/", "");
  console.log("pathname:", pathname);

  const logoutButton = () => {
    // history.push("/logout");
    history.push("/logout");
  };

  console.log("Re-rendering...");

  useEffect(() => {
    // this is just to make sure taht if the user inputs a unauthorized chatroom, it wouldn't let them access it
    console.log("useEffect...");
    const inputData = {
      email: userEmail,
      password: userPass,
      reqChatroom: pathname,
    };

    console.log("inputData:", inputData);

    // if accessing the chatroom is not valid or doesn't belong to you, you will be sent back to your /message-center
    if (validAccount) {
      console.log("Account Valid...");
      axios
        .post(
          `${process.env.REACT_APP_GET_API_KEY}user-chatroom-validation`,
          inputData
        )
        .then((res) => {
          console.log("res.data:", res.data);

          if (res.data.auth === true) {
            setIsValidRoom(true);
          } else {
            setIsValidRoom(false);
            history.push("/message-center");
          }
        })
        .catch((e) => {
          console.log("Error:", e);
        });
    }
  }, []);


  // pathname is from useLocation() which is a hook therefore useEffect can be used
  useEffect(() => {
    console.log("Room Changed:", pathname);
    if (pathname === "" || pathname === "/message-center") {
      setIsValidRoom(false);
      history.push("/message-center");
    }
  }, [pathname]);

  if (!validAccount) {
    console.log("Invalid Access Detected...");
    console.log("invalidAccount:", !validAccount);
    history.push("/login-form");
  }

  return (
    <div>
      <header>
        <h1>{username}'s Dashboard</h1>
        <p>userID: {userID}</p>
        <p>Current Chatroom: {pathname} </p>
        <button onClick={logoutButton}>Logout Button</button>
      </header>

      {/* if not a valid room, such as /message-center, do not let it add anyone */}
      {isValidRoom && <AddMembers chatroomID={pathname}></AddMembers>}
      {isValidRoom && <LeaveChatroom chatroomID={pathname} userID={userID} />}
      <div className="chatDisplay">
        {validAccount && <ChatroomLists></ChatroomLists>}
        {isValidRoom && <ChatroomMessages></ChatroomMessages>}
        {isValidRoom && <ChatroomMembers chatroomID={pathname} />}
      </div>
    </div>
  );
};

export default MessageCenter;
