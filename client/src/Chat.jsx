import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket,userName,room}) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async()=>{
        if(currentMessage !== ""){
            const messageData = {
                author: userName,
                roomID: room,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messageData)
            setMessageList((list)=> [...list, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(()=>{
        socket.on("recieved_message",(data)=>{
            setMessageList((list)=> [...list, data])
        })
    }, [socket])

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
            </div>
        <div className='chat-body'>
        <ScrollToBottom className="message-container">
            {messageList.map((message,index) =>{
                return(
                    <div key={index} className='message' id={userName === message.author ? "you" : "other"}>
                        <div>
                            <div className='message-content'>
                                 <p key={index}>{message.message}</p>
                            </div>
                            <div className='message-meta'>
                                <p id='time'>{message.time}</p>
                                <p id='author'>{message.author}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type='text' 
            value={currentMessage}
            placeholder='send a message...' 
            onChange={(e)=>{setCurrentMessage(e.target.value)}}
            onKeyPress={(e)=>{e.key === "Enter" && sendMessage()}}
            />
            <button className='chat-button' onClick={sendMessage}>send</button>
        </div>
    </div>
  )
}

export default Chat