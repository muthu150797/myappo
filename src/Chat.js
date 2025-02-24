
import { useState, useRef, useEffect } from "react";
import { Send, User } from "lucide-react";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./firebase"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState(""); // Ask for username
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userdata=JSON.parse(localStorage.getItem('user'))
    setUser(userdata);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      chatId:"public",
      senderId:user._id,
      name:user.name,
      createdAt: serverTimestamp().seconds*1000,
      username: username, // Use entered username instead of authentication
    });

    setNewMessage("");
  };

  return (
    <Card className="w-50 mx-auto mt-4 shadow-lg bg-white">
      <Card.Body className="d-flex flex-column" style={{ height: "500px" }}>
        <div className="flex-grow-1 overflow-auto p-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex align-items-center mb-2 ${msg.senderId === user._id? "justify-content-end" : "justify-content-start"}`}
            >
              <User size={24} className="me-2 text-dark" />
              <div className={`p-2 rounded ${msg.senderId ===user._id ? "bg-primary text-white" : "bg-secondary text-white"}`}>
              <p className="mb-0 fw-bold">{msg.name} <span className="text-muted" style={{ fontSize: "0.75rem" }}>{ new Date(msg.createdAt.seconds*1000).toLocaleTimeString("en-US", { 
 hour: "numeric",
 minute: "2-digit",
  hour12: true // Use `false` for 24-hour format
})}</span></p>
                <p className="mb-0">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <Form className="d-flex border-top p-2">
          <Form.Control
            type="text"
            value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button variant="primary" onClick={sendMessage}>
            <Send size={20} />
          </Button>
        </Form>
      </Card.Body>
    </Card>
    // <div>
    //   <h2>Public  Chat</h2>
     
    //   <div>
    //     {messages.map((msg) => (
    //       <p key={msg.id}>
    //         <strong>{msg.name || "Anonymous"}:</strong> {msg.text}
    //       </p>
    //     ))}
    //   </div>
    //   <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
    //   <button onClick={sendMessage}>Send</button>
    // </div>
  );
};


export default Chat;