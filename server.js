const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
const cors=require('cors');

const app=express();
app.use(cors({origin:"https://open-chats.onrender.com"}));

const server=http.createServer(app);

const io=socketIo(server,{
    cors:{
        origin:"*",
        methods:['GET','POST'],
    },
});

const PORT=process.env.PORT||5000;
io.on('connection',(socket)=>{
    console.log("User connected");

    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});
server.listen(PORT,()=> console.log(`Server running on ${PORT}.`));
