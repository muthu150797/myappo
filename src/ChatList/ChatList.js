import React, { Component } from "react";
import "./ChatList.css";
import ChatListItems from "../ChatList/ChatListItems";
import "./ChatList.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { dbReal } from "../firebase";
import { ref, onValue } from "firebase/database"
export default class ChatList extends Component {
  onlineusers =[];
  allChatUsers = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      id: 1,
      name: "Tim Hover",
      active: true,
      isOnline: true
    },
    {
      image:
        "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      id: 2,
      name: "Ayub Rossi",
      active: false,
      isOnline: false
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
      id: 3,
      name: "Hamaad Dejesus",
      active: false,
      isOnline: false
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
      id: 4,
      name: "Eleni Hobbs",
      active: false,
      isOnline: true
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
      id: 5,
      name: "Elsa Black",
      active: false,
      isOnline: false
    },
    {
      image:
        "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
      id: 6,
      name: "Kayley Mellor",
      active: false,
      isOnline: true
    },
    {
      image:
        "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
      id: 7,
      name: "Hasan Mcculloch",
      active: false,
      isOnline: true
    },
    {
      image:
        "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
      id: 8,
      name: "Autumn Mckee",
      active: false,
      isOnline: false
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
      id: 9,
      name: "Allen Woodley",
      active: false,
      isOnline: true
    },
    {
      image: "https://pbs.twimg.com/profile_images/770394499/female.png",
      id: 10,
      name: "Manpreet David",
      active: false,
      isOnline: true
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      onlineusers: [],
      allChats: this.allChatUsers
    };
   this.listenForAllUsers()
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
              { name: userData.name,
               status: userData.status.state,
               img: "https://bootdey.com/img/Content/avatar/avatar3.png"
               }
            )
           
          });
          this.setState((prevState) => ({
            ...prevState, // Keep other state properties unchanged
            onlineusers: this.onlineusers,
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
              {this.onlineusers.map((user, index) => (
                <li key={index} className="d-flex align-items-center p-2 rounded hover-bg-light">
                  <img src={user.img} alt="avatar" className="rounded-circle me-3" width="40" height="40" />
                  <div>
                    <div className="fw-bold">{user.name}</div>
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
