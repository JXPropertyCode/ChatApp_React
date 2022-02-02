import { useEffect, useState } from "react";
import axios from "axios";

const ChatroomMembers = ({ chatroomId }) => {
  const [members, setMembers] = useState([]);

  const inputCred = {
    chatroom: chatroomId,
  };

  useEffect(() => {
    updateMemberList();
  }, []);

  function updateMemberList() {
    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}get-chatroom-members`,
        inputCred
      )
      .then((res) => {
        setMembers(res.data.membersInChatroom);
      })
      .catch((err) => {
        return err;
      });
  }

  return (
    <div className="chatroomWindow">
      <input type="button" onClick={() => updateMemberList()} value="Refresh" />
      <h3>Chatroom Members</h3>
      {members.map((member, idx) => {
        // this is for if the user deletes their account, it would not crash the application due to unable to read "null"
        if (member === null) {
          return <div key={idx}></div>;
        }

        return <p key={idx}>{member.username}</p>;
      })}
    </div>
  );
};

export default ChatroomMembers;
