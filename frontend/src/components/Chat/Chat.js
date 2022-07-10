import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join"
import socketIOClient from 'socket.io-client'
import sendLogo from '../../images/send.png'
import './Chat.css'

const ENDPOINT = "http://localhost:4500/";     // ENPOINT is the pt from where the socket is to be received
let socket;

const Chat = () => {

    const [id, setId] = useState("");
    const [message, setMessage] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    useEffect(() => {
        socket = socketIOClient(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {        // on means receiving data
            alert('Connected');
            setId(socket.id);
        })

        socket.emit('joined', { user })        // emit means the data is being send

        socket.on('welcome', (data) => {
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            console.log(data.user, data.message);

        })

        return () => {
            socket.emit('disconnected');
            socket.off();
        }
    }, [])

    useEffect(() => {
      socket.on('sendMessage', (data)=>{
        console.log(data.user, data.message, data.id) 
      })
    
      return () => {
        
      }
    }, [])
    
    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header"><h2>Flingrr</h2></div>
                <div className="chatBox"></div>
                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat