import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import Navbar from "../functions/Navbar";
import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import { chatRouteTransition } from "../../animations/routeAnimations";

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
  const pageID = useSelector((state) => state.board.board);

  const [chatUsers, setChatUsers] = useState([]);
  const [chatMessage, setchatMessage] = useState({
    name: "",
    msg: "",
  });
  const [msgList, setMsgList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("General");
  let history = useHistory();

  useEffect(() => {
    socket.emit("userJoin", user.name);
  }, []);

  socket.on("newMessage", (newMessage) => {
    // return message
    setMsgList([
      ...msgList,
      {
        name: newMessage.name,
        msg: newMessage.msg,
        isPM: newMessage.isPM,
        time: newMessage.time,
      },
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
  // const checkTime = () => {
  //   setTimeStamp(new Date().toLocaleString());
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      name: chatMessage.name,
      msg: chatMessage.msg,
      room: currentRoom,
      isPM: checkPM(currentRoom, chatUsers),
      time: "",
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
  const handleBack = () => {
    history.push(`/board/${pageID._id}`);
  };
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <motion.div
      variants={chatRouteTransition}
      initial="hidden"
      animate="show"
      exit="exit"
      className="outer-div"
    >
      <Navbar />
      <Container className="chat clearfix">
        <Button id="backpage" variant="contained" onClick={handleBack}>
          Back To Board
        </Button>

        <div className="chat-wrapper">
          <div id="user-list">
            <h4>
              <b>Project Chatrooms</b>
            </h4>
            <ul style={{ listStyleType: "none" }} className="clearfix">
              {boards.map((board) => {
                return (
                  <li
                    onClick={enterRoom}
                    style={{ cursor: "pointer" }}
                    key={board._id}
                  >
                    <h4>{board.title}</h4>
                    <hr className="line" size="8" width="100%"></hr>
                  </li>
                );
              })}
            </ul>

            <h4 className="name">
              <strong>Online Users</strong>
            </h4>
            <ul style={{ listStyleType: "none" }} className="clearfix">
              {chatUsers.map((user) => {
                return (
                  <li
                    onClick={enterRoom}
                    style={{ cursor: "pointer" }}
                    key={user}
                  >
                    <span className="onlineStatus">
                      <StyledBadge
                        className="light"
                        overlap="circle"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                        style={{ marginRight: "1rem" }}
                      ></StyledBadge>
                      <h4>{user}</h4>
                    </span>
                    <hr className="line" size="8" width="100%"></hr>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="chat-messages-container">
            <h4 className="room-name"> Chat Messages ({currentRoom}) Room </h4>
            <div id="chatMessages">
              {msgList.map((msgList, index) => {
                console.log(msgList);
                let odd;
                msgList.name === user.name ? (odd = false) : (odd = true);
                return (
                  <div
                    key={index}
                    style={{ width: "100%", minHeight: "100px" }}
                  >
                    <div className={odd ? "left-align" : "right-align"}>
                      <div>
                        <div className="sender-name">
                          <span
                            className="circle-div"
                            style={{
                              backgroundColor: odd ? "#86BB71" : "#94C2ED",
                            }}
                          ></span>
                          <strong>
                            {msgList.isPM
                              ? `PM from ${msgList.name}`
                              : `${msgList.name} ${msgList.time}`}
                          </strong>
                        </div>

                        <div
                          className={`single-msg  ${
                            odd ? "not-my-msg" : "my-msg"
                          }`}
                        >
                          <em>
                            <span style={{ color: "white" }}>
                              {msgList.msg}
                            </span>
                          </em>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={onSubmit} id="message-input">
              <input
                type="text"
                name="msg"
                value={chatMessage.msg}
                onChange={handleChange}
                required
                style={{ width: "80%" }}
              />
              <input className="msgSendBtn" type="submit" value="Send" />
            </form>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Chat;
