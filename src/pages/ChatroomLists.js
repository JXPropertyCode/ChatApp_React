import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatroomLists = () => {
  const createChatRoomName = useRef(null);
  const owner = useSelector((state) => state.auth.owner);
  const [chatrooms, setChatrooms] = useState([]);

  const getChatrooms = async () => {
    const inputCred = {
      _id: owner,
    };

    const getUserChatroom = await axios
      .post(`${process.env.REACT_APP_GET_API_KEY}get-user-chatroom`, inputCred)
      .then((res) => {
        setChatrooms([...res.data]);
        return [...res.data];
      })
      .catch((e) => {
        return e;
      });

    // console.log("getUserChatroom:", getUserChatroom);
  };

  useEffect(() => {
    getChatrooms();
  }, []);

  const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

  const createRoom = async (e) => {
    e.preventDefault();

    // prevent white spaces from being used
    let strFilter = removeExtraSpace(createChatRoomName.current.value);

    if (strFilter.length === 0) {
      return;
    }

    const inputCred = {
      owner: owner,
      chatroomName: createChatRoomName.current.value,
    };

    await axios
      .post(`${process.env.REACT_APP_GET_API_KEY}create-chatroom`, inputCred)
      .then((res) => {
        if (res.data.validCred === "true") {
          // console.log("res.data:", res.data);

          // console.log("Success! Auth to Create a Chatroom...");
          alert(`Created Chatroom: ${createChatRoomName.current.value}`);
          setChatrooms([...chatrooms, res.data.chatroomCreated]);
        } else {
          // console.log("Error in Creating a Chatroom");
          alert("Error in Creating Chatroom");
        }
      })
      .catch((err) => {
        // console.log("Error in Creating a Chatroom...");
        console.error(err);
        return err;
      });

    // refreshes chatroom lists itself
    getChatrooms();

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
