import { useState, useEffect, useRef } from "react";

const AddMembers = () => {
	const addMembers = useRef(null);

	const addMembersToRoom = (e) => {
		e.preventDefault()
		const userInput = addMembers.current.value;

		// the split creates an array of the input by removing the commas and spaces
		const removeCommas = userInput.split(/[ ,]+/)
		console.log("Adding Members:", removeCommas)
		addMembers.current.value = ""
	};

	return (
		<div>
			<form onSubmit={(e) => addMembersToRoom(e)}>
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
