const MessageCenter = () => {
    console.log("Welcome to Message Center")
	return (
		<div>
			<div className="chatDisplay">
				{/* onFormSubmit() mechanism enables you to click the input box and pressing enter would trigger it only */}
				<div className="messageWindow">
					{/* {messages.map((msg, i) => {
						return <p key={i}>{msg.clientMessage}</p>;
					})} */}
				</div>
				<form
					className="messageBox"
					// onSubmit={(e) => onFormSubmit(e, prepMessage)}
				>
					<input
						className="messageInputBox"
						type="text"
						// value={prepMessage}
						// onChange={(e) => setPrepMessage(e.target.value)}
					/>
					<button className="chatSendButton" type="submit">
						Send
					</button>
				</form>
			</div>
		</div>
	);

}

export default MessageCenter