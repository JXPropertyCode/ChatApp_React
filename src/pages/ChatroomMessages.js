import { Redirect, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import MessageObject from "../model/MessageObject";
import axios from "axios";
import "../components/messageBox.css";
import moment from "moment";

const ChatroomMessages = () => {
  const params = useParams();

  // console.log("Current roomId Params:", params);

  const pathname = params.roomId;

  // console.log("pathname:", pathname);

  const validAccount = useSelector((state) => state.auth.accountVerified);
  const userEmail = useSelector((state) => state.auth.email);
  const userPass = useSelector((state) => state.auth.password);
  const username = useSelector((state) => state.auth.username);
  const owner = useSelector((state) => state.auth.owner);
  const prepMessage = useRef(null);
  const [messagelog, setMessagelog] = useState([]);

  // owner is the userId before its populated with the accountCollection data
  // it passes to the Express so it can detect the unique client.
  const { sendMessage, lastMessage } = useWebSocket(
    `ws://localhost:8000/${pathname}/${owner}`
  );

  const [isScrollActive, setIsScrollActive] = useState(true);

  const getMessagelog = () => {
    axios
      // this axios gets data from the message pathway while giving the path query to the 8000 server to identify the room in which to retreive information/data
      .get(`${process.env.REACT_APP_GET_API_KEY}messages?room=${pathname}`)
      .then(async (res) => {
        let currentChatroomMessages = [];
        for (let i = 0; i < res.data.length; i++) {
          // console.log("res.data[i].room:", res.data[i].room === pathname);
          if (res.data[i].room === pathname) {
            // console.log("res.data[i]:", res.data[i])
            let retrieveRoomData = res.data[i];
            currentChatroomMessages.push(retrieveRoomData);
          }
        }
        // console.log("currentChatroomMessages:", currentChatroomMessages);
        setMessagelog([...currentChatroomMessages]);
        return currentChatroomMessages;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    var W3CWebSocket = require("websocket").w3cwebsocket;

    var client = new W3CWebSocket(
      `ws://localhost:8000/${pathname}/${owner}`,
      "echo-protocol"
    );

    // console.log(`ws://localhost:8000/${pathname}`);

    client.onerror = function () {
      // console.log("Connection Error");
    };

    // sending random numbers to Express's websocket, then Express would output them
    // this is optional for testing purposes
    client.onopen = function () {
      // console.log("WebSocket Client Connected to", pathname);
      // function sendNumber() {
      // 	// this is while the connection is open, it will continually keep sending messages
      // 	// to visualize the flow
      // 	if (client.readyState === client.OPEN) {

      // 		var number = Math.round(Math.random() * 0xffffff);
      // 		let sendInitialData = {
      // 			dateSent: new Date(),
      // 			clientMessage: number.toString()
      // 		}
      // 		// client.send(number.toString());
      // 		client.send(JSON.stringify(sendInitialData))
      // 		setTimeout(sendNumber, 10000);
      // 	}
      // }
      // sendNumber();
    };

    client.onclose = function () {
      // console.log("echo-protocol Client Closed");
    };

    // console.log("UseEffect...");
    getMessagelog();
    // optional return function can be here to process a cleanup
  }, []);

  // console.log("Current Message Log:", messagelog);

  // to detect when to scroll
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // if the behavior is "smooth", it cannot catch up to fast messages
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const scrollRef = useRef(null);

  const onScroll = (e) => {
    // detects if youre at the bottom of the page
    e.preventDefault();
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      // console.log("Bottom of the page");
      setIsScrollActive(true);
    } else {
      // console.log("NOT bottom of the page");
      setIsScrollActive(false);
    }
  };

  useEffect(() => {
    if (isScrollActive) {
      scrollToBottom();
    }
  }, [messagelog, lastMessage]);

  // original
  useEffect(() => {
    if (lastMessage !== null) {
      // console.log("lastMessage:", lastMessage);
      const convertData = JSON.parse(lastMessage.data);

      // previously when I messaged in one room, every room received the message.
      // this was the way I used to prevent that.
      // problem with this is that what if there are a billion people speaking at the same time?
      // it would be slow due to this keeps filtering messages after receiving them
      // if (convertData.room === pathname) {
      // console.log("lastMessage:", convertData);
      // when getting new messages just update the state
      setMessagelog([...messagelog, convertData]);
      // }
    }
  }, [lastMessage]);

  if (!validAccount) {
    return <Redirect to="/login-form" />;
  }

  const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const prepmessage = prepMessage.current;
    // the reason why they needed the ex. ['inputMessage'] is because useRef() is used on the form and this name of the input is nested.
    // therefore like a tree or node or nested object, you need to access it by its name
    const currentPrepMessageValue = prepmessage["inputMessage"].value;

    // prevent empty strings from being sent
    let strFilter = removeExtraSpace(currentPrepMessageValue);

    if (strFilter.length === 0) {
      // console.log("Cannot Have Empty Spaces in Chat Room Name");
      prepmessage["inputMessage"].value = "";
      return;
    }

    let convertData = new MessageObject(
      pathname,
      owner,
      username,
      userEmail,
      userPass,
      currentPrepMessageValue
    );

    // console.log("Data Sent to Server:", convertData);
    sendMessage(JSON.stringify(convertData));
    prepmessage["inputMessage"].value = "";
  };

  return (
    <div
      className="messageWindow"
      ref={scrollRef}
      onScroll={(e) => onScroll(e)}
    >
      <div>
        {messagelog.map((message, idx) => {
          // if (message !== null) {
          // console.log("messagelog's message:", message);
          // this is needed due to the bug in which messages show for other rooms

          // since owner was populated, it is now an object

          return (
            <div
              key={idx}
              style={{
                textAlign: message.owner._id !== owner ? "left" : "right",
              }}
            >
              <div>{moment(message.createdAt).format("llll")}</div>
              <div>
                {message.owner.username}: {message.clientMessage}
              </div>
            </div>
          );
          // }

          // return null;
        })}
        <div ref={messagesEndRef} />
      </div>
      <div>
        <form
          className="messageBox"
          onSubmit={(e) => {
            e.preventDefault();
            if (prepMessage !== "") {
              onFormSubmit(e);
            }
          }}
          ref={prepMessage}
        >
          <input
            className="messageInputBox"
            type="text"
            name={"inputMessage"}
          />
          <button className="chatSendButton" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatroomMessages;
