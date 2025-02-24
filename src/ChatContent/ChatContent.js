import React, { Component, createRef, useEffect } from "react";
import { db } from "../firebase"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';

import "./ChatContent.css";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import ChatList from "../ChatList/ChatList";
export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
   user=[];
    messages = [];
  chatItms = [
    {
      key: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "",
      msg: "Hi Tim, How are you?"
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine."
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?"
    },
    {
      key: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "",
      msg: "Awesome these days."
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?"
    },
    {
      key: 6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "",
      msg: "what plan mate?"
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial"
    }
  ];

  constructor(props) {
    console.log("props",props)
    super(props);
    this.state = {
      chat: this.chatItms,
      newMessage:"",
      msg: ""
    };
    const userdata = JSON.parse(localStorage.getItem("user"));
    this.user=userdata;
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.getMessages();
    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode == 13) {
    //     if (this.state.msg != "") {
    //       this.chatItms.push({
    //         key: 1,
    //         type: "",
    //         msg: this.state.msg,
    //         image:
    //           "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
    //       });
    //       this.setState({ chat: [...this.chatItms] });
    //       this.scrollToBottom();
    //       this.setState({ msg: "" });
    //     }
    //   }
    // });
    this.scrollToBottom();
  }
   timeAgo = (firebaseTimestamp) => {
    if (!firebaseTimestamp) return "Invalid date";

    // Convert Firebase Timestamp to JavaScript Date
    const date =new Date(firebaseTimestamp.seconds * 1000); //firebaseTimestamp instanceof Timestamp ? firebaseTimestamp.toDate() : new Date(firebaseTimestamp);
    
    if (!date) {
        console.error("timeAgo function was called without a date!");
        return "Invalid date";
    } 
   return  formatDistanceToNow(date, { addSuffix: true })
   .replace("about","").replace("in","");
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return "Just now";

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (let unit in intervals) {
        const count = Math.floor(seconds / intervals[unit]);
        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    }
};
  async getMessages() {
    const userdata = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: userdata });
  
    console.log("User Data:", userdata);
  
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
  
    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const messageList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            time: data.createdAt?.toDate
              ? data.createdAt.toDate().toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Invalid Time",
          };
        });
  
        this.setState({ messages: messageList });
        this.setState({ messages: messageList });
        this.messages=messageList
        // ✅ Debugging logs
        console.log("Fetched Messages:", this.messages);
      } else {
        console.log("No messages found in Firestore.");
      }
    });
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value,newMessage:e.target.value });
  };
  sendMessage=async()=>{
    if (!this.state.newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: this.state.newMessage,
      chatId:"public",
      senderId:this.user._id,
      name:this.user.name,
      createdAt: serverTimestamp(),//.seconds*1000,
      username: "", // Use entered username instead of authentication
    });
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
              <p>Tim Hover</p>
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
        <div className="content__body">
          <div className="chat__items">
            {this.messages.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm._id}
                  user={itm.senderId!=this.user._id ? itm.type : "me"}
                  msg={itm.text}
                  time={this.timeAgo(itm.createdAt)}
                  image={itm.image}
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
              value={this.state.newMessage || ""}            />
            <button onClick={this.sendMessage}  className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
