import React, { Component, createRef, useEffect } from "react";
import { db, dbReal } from "../firebase"
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';
import { ref, get, push, set, serverTimestamp, onValue, onChildAdded, update } from "firebase/database";
import { getChatId } from "../ChatList/ChatList"
import "./ChatContent.css";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import ChatList from "../ChatList/ChatList";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  user = [];
  messages = [];
  chatItms = [];

  constructor(props) {
    console.log("props", props)
    super(props);
    this.state = {
      chat: this.chatItms,
      newMessage: "",
      msg: ""
    };
    const userdata = JSON.parse(localStorage.getItem("user"));
    this.user = userdata;
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {



    console.log("ChildA Props:", this.props);
    this.getMessages();
    this.scrollToBottom();
  }
  timeAgo = (firebaseTimestamp) => {
    try {
      if (!firebaseTimestamp) return "Invalid date";

      // Convert Firebase Timestamp to JavaScript Date
      const date = new Date(firebaseTimestamp); //firebaseTimestamp instanceof Timestamp ? firebaseTimestamp.toDate() : new Date(firebaseTimestamp);

      if (!date) {
        console.error("timeAgo function was called without a date!");
        return "Invalid date";
      }
      return formatDistanceToNow(date, { addSuffix: true })
        .replace("about", "").replace("in", "").replace("less than a mute ago", "just now").replace("mutes", "minutes");
    } catch (e) {
      return "Invalid Date/time";
    }

  };
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps values:", this.props);
    console.log("probs current", this.props);
    if (prevProps.data.userId != this.props.data.userId) {
      console.log(`Prop changed from ${prevProps.data.userId} to ${this.props.data.userId}`);
      this.getMessages();
    }

  }
  async getMessages() {
    let chatId = await this.getChatId(this.props.data.userId, this.user._id)//
    if (this.props.data.userId == undefined && chatId.includes("undefined")) {
      return;
    }
    const chatRef = ref(dbReal, "chats/" + chatId);

    // Listen for real-time updates to the 'users' node
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersDatas = snapshot.val();
        console.log("All users Data:", usersDatas);
        this.messages = [];
        if (usersDatas != null) {
          Object.entries(usersDatas).forEach(([listId, message]) => {
            //console.log("message", message)
            //Object.entries(mesagelist).forEach(([chatID ,message]) => {
            this.messages.push(
              {
                senderId: message.senderId,
                _id: listId,
                name: message.name,
                text: message.text,
                createdAt: message.createdAt
              }
            )
            // ✅ Debugging logs
            // })
          });
          console.log("Fetched Messages:", this.messages);
          this.setState((prevState) => ({
            ...prevState, // Keep other state properties unchanged
            messages: [...this.messages],
          }));

        }

        // updateUI(usersData); // Pass data to your UI update function
      } else {
        this.setState((prevState) => ({
          ...prevState, // Keep other state properties unchanged
          messages: [],
        }));
        console.log("No users found");
      }
    });
    this.scrollToBottom();
  }
  getChatId(userA, userB) {
    return [String(userA).trim(), String(userB).trim()].sort().join("_");
  }
  onEnterKey = (e) => {
    if (e.key === "Enter") { // Recommended way
      this.sendMessage();
    }
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value, newMessage: e.target.value });
  };
  sendMessage = async () => {
    if (!this.state.newMessage.trim()) return;

    const id1 = this.user._id;
    const id2 = this.props.data.userId;
    if (id2 == undefined) { alert("Select user "); return; }
    let chatId = this.getChatId(id1, id2)// Unique chat ID
    const chatRef = ref(dbReal, `chats/${chatId}`);
    try {
      const snapshot = await get(chatRef);
      // If user does not exist, create a new entry
      await push(chatRef, {
        text: this.state.newMessage,
        senderId: this.user._id,
        name: this.user.name,
        read: false,
        createdAt: Date.now()
      }); // Creates an empty list node
      console.log("New  message created:");
      this.props.getUserLoad()
    } catch (error) {
      console.error("Error creating/updating usermessgaes:", error);
    }
    // await addDoc(collection(db, "messages"), {
    //   text: this.state.newMessage,
    //   chatId:"public",
    //   senderId:this.user._id,
    //   name:this.user.name,
    //   createdAt: serverTimestamp(),//.seconds*1000,
    //   username: "", // Use entered username instead of authentication
    // });
    this.state.newMessage = "";
    this.getMessages();
    this.scrollToBottom();
  };
  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>{this.props.data.name}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body scrollContainer">
          <div className="chat__items content">
            {this.messages.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm._id}
                  user={itm.senderId != this.user._id ? "other" : "me"}
                  msg={itm.text}
                  time={this.timeAgo(itm.createdAt) || "Invalid time"}
                  image={"https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg"}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              onKeyDown={this.onEnterKey}
              value={this.state.newMessage || ""} />
            <button onClick={this.sendMessage} className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
