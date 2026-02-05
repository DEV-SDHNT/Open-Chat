import "./App.css";
import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';

//const backendAPI="http://0.0.0.0:5000";
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
	    <div className="chat-container">
		{chat.map((msg,index)=>(
		    <div className="msg-container" key={index} style={{ justifyContent:msg.senderId===sessionId? 'right':'left',}}>
			{msg.type==='code'?
			 (
                             <div className="codesnip" style={{
				      justifyContent:msg.senderId===sessionId ? 'left':'right',
				      borderEndEndRadius:msg.senderId===sessionId ? '25px':'20px',
				      borderEndStartRadius:msg.senderId===sessionId ?'10px':'15px'
				  }}>
				 {msg.content}
			     </div>
                         )
			 :(
                             <div className="message" style={{
				      justifyContent:msg.senderId===sessionId ? 'left':'right',
				      borderEndEndRadius:msg.senderId===sessionId ? '3px':'25px',
				      borderEndStartRadius:msg.senderId===sessionId ?'25px':'3px',}}>
				 {msg.content}
			     </div>
			 )
                        }
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
