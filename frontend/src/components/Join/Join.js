import React, { useState } from 'react'
import './Join.css';
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

let user;


const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";      // as soon as button is clicked, clear off the username
}


const Join = () => {

  const [name, setName] = useState("")

  
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Flingrr</h1>
        <input onChange={(e) => setName(e.target.value)} type="text" id="joinInput" placeholder='Enter your name' />
        <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat"> <button className="joinBtn" onClick={sendUser}>Join Chat</button></Link>
      </div>
    </div>
  )
}

export default Join
export { user }