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

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log("DB Connection Successfull");
// })
// .catch((err) => {
//     console.log(err.message);
// })

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`)
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