import React, {useEffect} from 'react';
import {useState} from 'react';
import {user} from '../Join/Join';
import socketIO from 'socket.io-client';
import './Chat.css';
import sendIcon from '../../images/sendIcon.png';
import Message from '../Message/Message';
import { Link } from 'react-router-dom';


let socket;
const ENDPOINT = 'http://localhost:5000/';

const Chat = () => {

    const [id, setid] = useState('');
    const [messages, setMessages] = useState([]);

    const send=()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message', {message, id});
        document.getElementById('chatInput').value='';
    }

    console.log(messages);
    useEffect(() => {
        // starting socket client
        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {
            setid(socket.id);

        })
        socket.emit('joined', {user});

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })
        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })
        return () => {
            socket.emit('disconnect', {user});
            socket.off();
        }
    },[])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log('checking', data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])
    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='headerBox'>
                    <h2>Pesalam</h2>
                    <a href='/' className='logoutBtn'>❌</a>
                </div>
                <div className='chatBox'>
                {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </div>
                <div className='inputBox'>
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type='text' id='chatInput' placeholder='Message'/>
                    <button onClick = {send} className='sendBtn'>
                        <img src={sendIcon} alt='sendIcon'></img>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
