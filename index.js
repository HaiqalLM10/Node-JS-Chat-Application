const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messagesRoute")
const socket = require("socket.io");

const app = express();
require("dotenv").config();

const corsOptions ={
   origin:'*', 
   credentials:true,   
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
    console.log(`Server Started on Port ${port}`)
})

const io = socket(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });

})