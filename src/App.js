import "./App.css";
// import axios from "axios";
import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';

const ENDPOINT="https://open-chat-nqse.onrender.com";
const sessionId=Math.random().toString(36).substring(2,9);
const App=()=>{
    const [socket,setSocket]=useState(null);
    const [message,setMessage]=useState('');
    const [isCode,setIsCode]=useState(false);
    const [chat,setChat]=useState([]);
    useEffect(()=>{
      const newSocket=io(ENDPOINT);
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
        <div 
          className="chat-container"
          style={{
            scrollbarGutter:'unset',
          }}
        >
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
          <button type="submit" style={{padding:'10px 10px'}}>></button>
          <div className="code-chk">
            <label>
              Code
              <input
              className="chk-box"
              type="checkbox"
              checked={isCode}
              onChange={()=>setIsCode(prev=>!prev)}
              /> 
            </label>
          </div>
        </form>
      </div>
    );
};
export default App;
