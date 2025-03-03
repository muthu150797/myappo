import React, { Component } from "react";
import "./ChatList.css";
import ChatListItems from "../ChatList/ChatListItems";
//import "./ChatList.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { dbReal } from "../firebase";
import { ref, off, get, push, set, onValue, serverTimestamp, onChildAdded } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import Badge from 'react-bootstrap/Badge';
import {useImperativeHandle, forwardRef } from "react"
export default class ChatList extends Component {

  onlineusers = [];
  userid = JSON.parse(localStorage.getItem("user"))._id
  allChatUsers = [

  ];
  constructor(props) {
    const mewMessagesRef = ref(dbReal, "chats"); // Adjust "messages" to your database path
    super(props);
    this.state = {
      onlineusers: [],
      allChats: this.allChatUsers,
      selectedUser: "no value",
    };
    this.goToChatRoom = this.goToChatRoom.bind(this);
   // this.getLoad();
  }
  componentDidMount() {
    this.listenForAllUsers();

  }
  loadUsers(){
    alert("usrlaod");

   this.listenForAllUsers();
  }
  getLoad = () => {
    const usersRef = ref(dbReal, "users");
    const newMessagRef = ref(dbReal, "chats");
    let unreadMessageCount = 0;
    off(newMessagRef, "child_added");

    // Attach listener for chat rooms
    onChildAdded(newMessagRef, async (roomSnapshot) => {
      const roomId = roomSnapshot.key;
      console.log("New chat room detected: " + roomId);
      console.log(`unreadMessageCount`, unreadMessageCount);
      const roomMessagesRef = ref(dbReal, `chats/${roomId}`);
      // Remove previous listeners to prevent duplicates
      off(roomMessagesRef, "child_added");
      // Attach listener for new messagessnapshotUser.forEach((messageSnapshot) => {
      let newMessageList = []

      onChildAdded(roomMessagesRef, async (messageSnapshot) => {
        newMessageList = messageSnapshot.val();
        const snapshotUser = await this.getNewMsg(usersRef);
        if (snapshotUser.exists()) {
          Object.entries(snapshotUser.val()).forEach(([userId, userData]) => {
            if (userId == newMessageList.senderId) {
              this.onlineusers.push(
                {
                  userId: userId,
                  name: userData.name,
                  unreadCount: 0,
                  status: userData.status.state,
                  img: "https://bootdey.com/img/Content/avatar/avatar3.png"
                }
              )
            }

          })
          unreadMessageCount = roomId && !newMessageList.read ? unreadMessageCount + 1 : 0;
        }
        console.log("newMessageList", newMessageList);
        console.log("Unread Messages Count:", unreadMessageCount);
      });
    });
  };
  getNewMsg = async (usersRef) => {
    return await get(usersRef);
  }
  getUnreadCount = async (chatroomId) => {
    const chatRef = ref(dbReal, `chats/${chatroomId}`);
    const snapshot = await get(chatRef);
    if (snapshot.exists()) {
      const messages = snapshot.val();
      let unreadCount = Object.values(messages).filter(msg => msg.read === false).length;
      console.log(`Unread messages in ${chatroomId}:`, unreadCount);
      return unreadCount;
    } else {
      console.log("No messages found for this chatroom!");
      return 0;
    }
  }
  listenForAllUsers = async () => {
    this.setState((prevState) => ({
      ...prevState, // Keep other state properties unchanged
      onlineusers: [],
    }));
    const usersRef = ref(dbReal, "users");
    // Listen for real-time updates to the 'users' node
    onValue(usersRef, async (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        console.log("All users:", usersData);
        this.onlineusers = [];
        this.setState((prevState) => ({
          ...prevState, // Keep other state properties unchanged
          onlineusers: [],
        }));
        if (usersData != null) {
          for (const [userId, userData] of Object.entries(usersData)) {
            let chatroomId =  await this.getChatId(userId, this.userid);
            let unreadcount=await userId==this.state.selectedUser?0:this.getUnreadCount(chatroomId);
            this.onlineusers.push(
              {
                userId: userId,
                name: userData.name,
                unreadCount: unreadcount,
                status: userData.status.state,
                img: "https://bootdey.com/img/Content/avatar/avatar3.png"
              }
            )

          };
          this.setState((prevState) => ({
            ...prevState, // Keep other state properties unchanged
            onlineusers: [...this.onlineusers],
          }));
          console.log("onlineusers", this.onlineusers);

        }

        // updateUI(usersData); // Pass data to your UI update function
      } else {
        this.setState((prevState) => ({
          ...prevState, // Keep other state properties unchanged
          onlineusers: [],
        }));
        console.log("No users found");
      }
    });
  }
  getChatId(userA, userB) {
    return [String(userA).trim(), String(userB).trim()].sort().join("_");
  }

  goToChatRoom = async (recieverId, userdata) => {
    this.setState({ selectedUser: recieverId })
    this.props.onSendData(userdata);

  }

  render() {
    return (
      <div className="main__chatlist">
        <div className="chatlist__heading">
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <ul className="list-unstyled">
          {this.state.onlineusers.map((user, index) => (
            <li className={`d-flex align-items-center p-2 rounded hover-bg-light ${this.state.selectedUser === user.userId ? "activeuser" : ""}`} onClick={() => this.goToChatRoom(user.userId, user)} key={index}>
              <img src={user.img} alt="avatar" className="rounded-circle me-3" width="40" height="40" />
              <div>
                <div className="fw-bold">{this.userid == user.userId ? "You" : user.name}
                {user.unreadCount>0 &&<Badge className="ms-2" bg="info">{user.unreadCount}</Badge>}

                
                </div>
                <div className="text-muted small">
                  <i className={`fa fa-circle ${user.status === "online" ? "text-success" : "text-danger"} me-1`}></i>
                  {user.time || user.status}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
