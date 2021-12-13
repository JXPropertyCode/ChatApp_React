import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatroomMessages from "./ChatroomMessages";
import ChatroomLists from "./ChatroomLists";
import ChatroomMembers from "./ChatroomMembers";
import AddMembers from "./AddMembers";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LeaveChatroom from "./LeaveChatroom";
import queryString from "query-string";

const MessageCenter = () => {
  const history = useHistory();

  const username = useSelector((state) => state.auth.username);
  const owner = useSelector((state) => state.auth.owner);
  const userPass = useSelector((state) => state.auth.password);
  const userEmail = useSelector((state) => state.auth.email);
  const [isValidRoom, setIsValidRoom] = useState(false);

  const validAccount = useSelector((state) => state.auth.accountVerified);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const roomId = searchParams.get('roomId')

  // const location = useLocation();
  // console.log("location.pathname:", location.pathname);

  // gets the path variable
  const params = useParams();
  // const { search } = useLocation()
  // const values = queryString.parse(search)

  // console.log("Current roomId Params:", params);

  const pathname = params.roomId;

  const logoutButton = () => {
    history.push("/logout");
  };

  // console.log("Re-rendering...");

  useEffect(() => {
    // this is just to make sure taht if the user inputs a unauthorized chatroom, it wouldn't let them access it
    // console.log("useEffect...");
    const inputData = {
      email: userEmail,
      password: userPass,
      reqChatroom: pathname,
    };

    // console.log("inputData:", inputData);

    // if accessing the chatroom is not valid or doesn't belong to you, you will be sent back to your /message-center
    if (validAccount) {
      // console.log("Account Valid...");
      axios
        .post(
          `${process.env.REACT_APP_GET_API_KEY}user-chatroom-validation`,
          inputData
        )
        .then((res) => {
          // console.log("res.data:", res.data);

          if (res.data.auth === true) {
            setIsValidRoom(true);
          } else {
            setIsValidRoom(false);
            history.push("/message-center");
          }
        })
        .catch((err) => {
          // console.log("Error:", e);
          return err;
        });
    }
  }, []);

  // pathname is from useLocation() which is a hook therefore useEffect can be used
  // useEffect(() => {
  //   console.log("Room Changed:", pathname);
  //   if (pathname === "" || pathname === "/message-center") {
  //     setIsValidRoom(false);
  //     history.push("/chatroom-lists/");
  //   }
  // }, [pathname]);

  if (!validAccount) {
    // console.log("Invalid Access Detected...");
    // console.log("invalidAccount:", !validAccount);
    history.push("/login-form");
  }

  return (
    <div>
      <header>
        <h1>{username}'s Dashboard</h1>
        {validAccount && <a href={`/user-profile/${owner}`}>My Profile</a>}
        <p>userID: {owner}</p>
        <p>Current Chatroom: {pathname} </p>
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
