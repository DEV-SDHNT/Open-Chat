import "./App.css";
import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';

const backendAPI="https://open-chat-nqse.onrender.com";
const sessionId=Math.random().toString(36).substring(2,9);
const App=()=>{
    const [socket,setSocket]=useState(null);
    const [message,setMessage]=useState('');
    const [isCode,setIsCode]=useState(false);
    const [chat,setChat]=useState([]);
    useEffect(()=>{
      const newSocket=io(backendAPI);
      setSocket(newSocket);

      newSocket.on('chat message',(msg)=>{
        setChat(prevChat=>[...prevChat,msg]);
      });
      return ()=>newSocket.disconnect();
    },[]);

    const sendMessage=(e)=>{
      e.preventDefault();
      if(message.trim() && socket){
        const msgObj={
          type:isCode?'code':'text',
          content:message,
          senderId:sessionId,
        };
        socket.emit('chat message',msgObj);
        setMessage('');
      }
    };

    return (
      <div className="app" style={{margin:'0 auto',width:'90%',textAlign:'center'}}>
        <h1>OpenChat</h1>
        <div className="info-block">
        <button className="info">i</button>
        <div className="tip">
          <h3>Just a simple chat app project.</h3>
          <h4>Things to know before use!</h4>
          <li>This project have no database so the chats are not saved anywhere. Just a refresh will delete every message on your side.</li>
          <li>Also it is OpenChat so if you send a message then it is visible to everyone who are live at that instance.</li>
          <li>Good thing is you can talk to anyone from anywhere anonymously.<br></br>(!! Area69  will still know !!)</li>
          <li>You can also say it an Universal Comment Section.</li>
          <h4>Enjoy your talk if you find someone!</h4>
        </div>
        </div>
        <div className="chat-container">
          {chat.map((msg,index)=>(
            <div className="msg-container" key={index} style={{ textAlign:msg.senderId===sessionId? 'left':'right',}}>
              {msg.type==='code'?
              (<div className="codesnip" style={{
                justifyContent:msg.senderId===sessionId? 'left':'right',
                borderEndEndRadius:msg.senderId===sessionId? '15px':'0px',
                borderEndStartRadius:msg.senderId===sessionId?'0px':'15px',
                }}>
                  {msg.content}
                </div>)
              :(<div className="message" style={{
                justifySelf:msg.senderId===sessionId? 'left':'right',
                borderEndEndRadius:msg.senderId===sessionId? '20px':'0px',
                borderEndStartRadius:msg.senderId===sessionId?'0px':'20px'}}>
                  {msg.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <textarea
            className="txt-box"
            rows="3"
            placeholder="Type your message here ..."
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          ></textarea>
          <button type="submit" className="send-btn">Send</button><br></br>
        </form>
      </div>
    );
};
export default App;
