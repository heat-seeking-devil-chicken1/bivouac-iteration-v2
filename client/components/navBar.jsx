import React from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()
    return (
        <div className="nav">
          <p id="logo">Bivouac</p>
          <div>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/addhike">Add Hike</Link>
            <button className="logout" onClick={()=>{
              localStorage.removeItem('user')
              navigate("/login")}}>Logout</button>
          </div>
        </div>
    )
}

export default NavBar;