const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
const cors=require('cors');

const app=express();
app.use(cors({origin:"https://open-chats.onrender.com"}));

const server=http.createServer(app);

const io=socketIo(server,{
    cors:{
		//origin:"http://0.0.0.0:3000",
        origin:"https://open-chats.onrender.com",
        methods:['GET','POST'],
    },
});

const PORT=process.env.PORT||5000;
user_count=0;
io.on('connection',(socket)=>{
    user_count+=1;
    console.log(`Users connected :${user_count}`);

    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    });
    
    socket.on('disconnect',()=>{
        user_count-=1;
        console.log('User disconnected');
    });
});
server.listen(PORT,"0.0.0.0",()=> console.log(`Server running on ${PORT}.`));
