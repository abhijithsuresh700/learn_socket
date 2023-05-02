// import  express  from "express";
import { Server } from "socket.io";
import { createServer } from "http";




// app.use(cors());

// const app = express();

const httpServer = createServer();
const io = new Server(httpServer,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`connection established by user: ${socket.id}`)

    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`connected user: ${socket.id} and room ID is ${data}`)
    })

    socket.on("send_message", (data)=>{
        socket.to(data.roomID).emit("recieved_message", data)
    })

    socket.on("disconnect", ()=>{
        console.log("connection disconnected")
    })
})

httpServer.listen(5000,()=>console.log("socket server listening on port 5000"))




