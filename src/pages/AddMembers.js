import { useSelector } from "react-redux";
import { useRef } from "react";
import axios from "axios";

const AddMembers = ({ chatroomId }) => {
  const addMembers = useRef(null);
  const userEmail = useSelector((state) => state.auth.email);

  const authToAddMembers = async (e) => {
    e.preventDefault();

    const inputCred = {
      email: userEmail,
    };

    await axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}verify-auth-to-add-users-to-chatroom`,
        inputCred
      )
      .then((res) => {
        if (res.data.validCred === "true") {
          addMembersToRoom();
        }
      })
      .catch((err) => {
        console.error(err);
      });

    addMembers.current.value = "";
  };

  const addMembersToRoom = () => {
    const userInput = addMembers.current.value;

    // the split creates an array of the input by removing the commas and spaces
    const addMembersList = userInput.split(/[ ,]+/);

    const inputData = {
      currentChatroom: chatroomId,
      addMembersList: addMembersList,
    };

    axios
      .post(
        `${process.env.REACT_APP_GET_API_KEY}add-users-to-chatroom`,
        inputData
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <div>
      <form onSubmit={(e) => authToAddMembers(e)}>
        <input
          className="chatMemberInputBox"
          type="text"
          name="name"
          placeholder="Add MemberID to Chatroom, Ex: id1, id2, id3"
          ref={addMembers}
        />
        <button className="addChatMemberInputBox" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddMembers;
