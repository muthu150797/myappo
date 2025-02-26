import React, { Component } from "react";
import "./ChatList.css";
import ChatListItems from "../ChatList/ChatListItems";
//import "./ChatList.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { dbReal } from "../firebase";
import { ref,get,push,set, onValue, serverTimestamp } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export default class ChatList extends Component {
  onlineusers =[];
   userid=JSON.parse(localStorage.getItem("user"))._id
  allChatUsers = [
   
  ];
  constructor(props) {
    super(props);
    this.state = {
      onlineusers: [],
      allChats: this.allChatUsers,
      selectedUser: "novalue",
    };
    this.goToChatRoom = this.goToChatRoom.bind(this);
  }
  componentDidMount() {
    this.listenForAllUsers();
  }
    listenForAllUsers=()=> {
    const usersRef = ref(dbReal, "users");
  
    // Listen for real-time updates to the 'users' node
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        console.log("All users:", usersData);
         this.onlineusers=[];
        if(usersData!=null){
          Object.entries(usersData).forEach(([userId, userData]) => {
            this.onlineusers.push(
              { 
                userId:userId,
                name: userData.name,
               status: userData.status.state,
               img: "https://bootdey.com/img/Content/avatar/avatar3.png"
               }
            )
           
          });
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

  goToChatRoom=async (recieverId,userdata)=>
  {
    this.setState({ selectedUser: recieverId })
    this.props.onSendData(userdata);
    // const id1=this.userid;
    // const id2=recieverId;
    // let chatId =this.getChatId(id1,id2)// Unique chat ID
    // //  const chatRef = ref(dbReal, `chats/${chatId}`);
    // try {
    //     // const snapshot = await get(chatRef);

    //     // if (snapshot.exists()) {
          
    //     // } else {
    //     //     // If user does not exist, create a new entry
    //     //     await set(chatRef,  {
    //     //        systemMessage: "Chat room created",
    //     //        createdAt:serverTimestamp(),
    //     //        }); // Creates an empty list node
    //     //     console.log("New  room status created:");
    //     // }
  
    // } catch (error) {
    //     console.error("Error creating/updating user room:", error);
    // }
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
                <li className={ `d-flex align-items-center p-2 rounded hover-bg-light ${this.state.selectedUser === user.userId ? "activeuser" : ""}`} onClick={() => this.goToChatRoom(user.userId,user)} key={index}>
                  <img src={user.img} alt="avatar" className="rounded-circle me-3" width="40" height="40" />
                  <div>
                    <div className="fw-bold">{this.userid==user.userId?"You":user.name}</div>
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
