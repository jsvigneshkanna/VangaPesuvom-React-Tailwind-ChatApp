import React, {useState}from 'react'
import './Join.css';
import logo from "../../images/logo.png"
import {Link} from 'react-router-dom';

let user;
// assigning the username to variable user
const sendUser=()=> {
    user=document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = '';
}
const Join = () => {
    
    const [name, setname] = useState("");
    return (
        <div className = 'joinPage'>
            <div className="joinContainer">
                <img src={logo} alt='logo' className='logo'></img>
                <input type='text' id='joinInput' 
                placeholder='Enter your Name'
                onChange={(event) => setname(event.target.value)}
                ></input>
                <Link to='/chat'
                onClick={(event) => !name ? event.preventDefault(): null}
                >
                    <button className='loginBtn' onClick={sendUser}>Pesuvom</button>
                </Link>                
            </div>
        </div>
    )
}

export default Join
export {user}
