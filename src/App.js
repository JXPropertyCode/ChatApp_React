import useWebSocket from "react-use-websocket";

function App() {
	// This can also be an async getter function. See notes below on Async Urls.
	const socketUrl = "ws://localhost:8000/";
	// ws://localhost:8000/

	const {
		sendMessage,
		sendJsonMessage,
		lastMessage,
		lastJsonMessage,
		readyState,
		getWebSocket,
	} = useWebSocket(socketUrl, {
		// if successfully connected to the Express WebSocket
		onOpen: () => console.log("Successfully Connected to Express WebSocket..."),
		// Will attempt to reconnect on all close events, such as server shutting down
		shouldReconnect: (closeEvent) => true,
	});

	return (
		<div>Hello</div>
	)
}

export default App;
