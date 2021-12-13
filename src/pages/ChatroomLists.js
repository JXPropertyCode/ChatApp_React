import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatroomLists = () => {
  const createChatRoomName = useRef(null);

  const owner = useSelector((state) => state.auth.owner);
  const userEmail = useSelector((state) => state.auth.email);
  const userPass = useSelector((state) => state.auth.password);

  const [chatrooms, setChatrooms] = useState([]);

  const getChatrooms = () => {
    const inputCred = {
      email: userEmail,
      password: userPass,
    };
    axios
      .post(`${process.env.REACT_APP_GET_API_KEY}get-user-chatroom`, inputCred)
      .then((res) => {
        // console.log("User Chatrooms From Server:", res.data.chatrooms);

        // console.log("User Chatrooms From Server:", res.data);
        setChatrooms([...res.data]);

        return;
      })
      .catch((e) => {
        // console.log("Error:", e);
        return e;
      });
  };

  useEffect(() => {
    // console.log("useEffect...");
    getChatrooms();
  }, []);

  const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

  const createRoom = (e) => {
    e.preventDefault();

    // prevent white spaces from being used
    let strFilter = removeExtraSpace(createChatRoomName.current.value);

    if (strFilter.length === 0) {
      // console.log("Cannot Have Empty Spaces in Chat Room Name");
      return;
    }

    // console.log("Creating Chat Room Name:", createChatRoomName.current.value);

    const inputCred = {
      owner: owner,
      chatroomName: createChatRoomName.current.value,
      // lastModified: Math.floor(Date.now() / 1000),
    };

    axios
      .post(`${process.env.REACT_APP_GET_API_KEY}create-chatroom`, inputCred)
      .then((res) => {
        if (res.data.validCred === "true") {
          // console.log("res.data:", res.data);

          // console.log("Success! Auth to Create a Chatroom...");

          setChatrooms([...chatrooms, res.data.chatroomCreated]);
        } else {
          // console.log("Error in Creating a Chatroom");
        }
      })
      .catch((err) => {
        // console.log("Error in Creating a Chatroom...");
        // console.error(err);
        err
      });

    // reset the input box value after submitting
    createChatRoomName.current.value = "";
  };

  return (
    <div className="chatroomWindow">
      <input type="button" value="Refresh" onClick={() => getChatrooms()} />
      <form onSubmit={(e) => createRoom(e)}>
        <input
          type="text"
          name="name"
          placeholder="Create Chat Room"
          ref={createChatRoomName}
        />
      </form>
      <h3> Your Chatrooms </h3>
      {chatrooms.map((chatroom, idx) => {
        // console.log("chatroom.chatroomName:", chatroom.chatroomName);
        return (
          <a key={idx} href={`/message-center/${chatroom.chatroomId}`}>
            {chatroom.chatroomName}
          </a>
        );
      })}
    </div>
  );
};

export default ChatroomLists;
