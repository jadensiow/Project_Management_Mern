import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import io from "socket.io-client";
import "../styles/chat.css";
import StyledBadge from "../styles/onlinelight";
const socket = io();

const Chat = () => {
  useEffect(() => {
    document.title = "Chatrooms";
  }, []);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state.board.boards);

  const [chatUsers, setChatUsers] = useState([]);
  const [chatMessage, setchatMessage] = useState({
    name: "",
    msg: "",
    room: "",
    isPM: false,
  });
  const [msgList, setMsgList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("General");

  useEffect(() => {
    socket.emit("userJoin", user.name);
  }, []);

  socket.on("newMessage", (newMessage) => {
    // return message
    setMsgList([
      ...msgList,
      { name: newMessage.name, msg: newMessage.msg, isPM: newMessage.isPM },
    ]);
  });

  // whenever send from server and set it
  socket.on("listOfUsers", (listOfUsers) => {
    setChatUsers(listOfUsers);
    setchatMessage({ name: user.name, msg: chatMessage.msg });
  });

  const handleChange = (e) => {
    setchatMessage({ ...chatMessage, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      name: chatMessage.name,
      msg: chatMessage.msg,
      room: currentRoom,
      isPM: checkPM(currentRoom, chatUsers),
    };

    //console.log("Just Sent: ", newMessage);

    // Once confirm sent out need to check backend
    socket.emit("newMessage", newMessage);

    setchatMessage({
      name: user.name,
      msg: "",
    });
  };
  const enterRoom = (e) => {
    let oldRoom = currentRoom;
    let newRoom = e.target.textContent;
    setCurrentRoom(newRoom);
    socket.emit("roomEntered", { oldRoom, newRoom });

    // to empty out chat or it will bring over
    setMsgList([]);
  };

  const checkPM = (roomName, userList) => {
    let isPM = false;
    userList.forEach((userName) => {
      if (userName === roomName) {
        isPM = true;
      }
    });
    return isPM;
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Row>
        <Col xs={5} style={{ border: "1px solid black" }}>
          <h4><b>Project Chatrooms</b></h4>
          <ul style={{ listStyleType: "none" }}>
            {boards.map((board) => {
              return (
                <li
                  onClick={enterRoom}
                  style={{ cursor: "pointer" }}
                  key={board._id}
                >
                 <h4>{board.title}</h4>
                </li>
              );
            })}
          </ul>

          <h4 className="name"><b>Connected Users: </b></h4>
          <ul style={{ listStyleType: "none" }}>
            {chatUsers.map((user) => {
              return (
                <li
                  onClick={enterRoom}
                  style={{ cursor: "pointer" }}
                  key={user}
                >
                <span className=" onlineStatus"> <h4>{user}</h4>
                  <StyledBadge className="light"
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                    marginLeft="20rem"
                  ></StyledBadge></span>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col style={{ border: "1px solid black" }}>
          <p> Chat Messages ({currentRoom}) Room </p>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="msg"
              value={chatMessage.msg}
              onChange={handleChange}
              required
              style={{ width: "80%" }}
            />
            <input type="submit" value="Message" />
          </form>
          <div id="chatMessages" style={{ border: "1px solid black" }}>
            Messages
            <ul style={{ listStyle: "none" }}>
              {msgList.map((msgList, index) => {
                return (
                  <li key={index}>
                    <b>
                      {msgList.isPM
                        ? `PM from ${msgList.name}: `
                        : `${msgList.name}: `}
                    </b>

                    <i>
                      <span style={{ color: msgList.isPM ? "red" : "black" }}>
                        {""}
                        {msgList.msg}
                      </span>
                    </i>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
