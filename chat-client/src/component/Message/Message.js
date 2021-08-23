import React from 'react'
import './Message.css'

const Message = ({user, message, classs}) => {
    if(user){
        return (
            <div className={`message ${classs}`}>
                {`${user}: ${message}`}
            </div>
        )
    }
    else {
        return (
            <div className={`message ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
