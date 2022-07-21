import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import HikeFeed from '../components/hikeFeed';
import ProfileInfo from '../components/profileInfo'
import Recommendations from '../components/recommendations'
import Favorites from '../components/favorites'
import { BrowserRouter as Router, Navigate, Route, Routes, Link } from "react-router-dom";
//import AddHikeScreen from './addHikeScreen'


const DashboardScreen = () => {
  const [hikesData, setHikesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showDashboard, setShowDashboard] = useState('hikes');

  const user = JSON.parse(localStorage.getItem('user'));

  const getHikes = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await axios.post(
        "/api/hikes/get-hikes",
        {
          userid: user._id
        }
      );
      setHikesData(response.data);
      //console.log(response.data)
      //console.log('user hikes are here!')
    }
    catch (error){
      console.log('error in gethikes function')
    }
  }

  const getUser = async () => {
    try {
      // const user = JSON.parse(localStorage.getItem('user'));

      const response = await axios.post(
        "/api/users/getallusers",
        {
          userid: user._id
        }
      );
      setUserData(response.data);
      //console.log(response.data)
      //console.log('user hikes are here!')
    }
    catch (error){
      console.log('error in getUser function')
    }
  }

const deleteHikes = async (hikeID) => {
  try {
    await axios.delete(`api/hikes/${hikeID}`);
    getHikes();
  }
  catch (error) {
    console.log('error in deletehikes function', hikeID)
  }
}

// const editHikes = async (
//   title,
//   date,
//   type,
//   location,
//   distance,
//   difficulty,
//   crowds,
//   notes,
//   id
// ) => {
//   console.log('hikeID in editHikes', title,
//   date,
//   type,
//   location,
//   distance,
//   difficulty,
//   crowds,
//   notes,
//   id);
//   try {
//     await axios.put(`api/hikes/${id}`, {
//       payload: {
//         title,
//         date,
//         type,
//         location,
//         distance,
//         difficulty,
//         crowds,
//         notes,
//         id
//       },
//     });
//     getHikes();
//   } catch (error) {
//     console.log('error in edithikes function');
//   }
// };

useEffect(() => {
  getHikes();
}, []);

//console.log('in dashboard screen', {hikesData})
console.log('started dashboard')
const clickHandler = (e) => {
  // console.log('clicked me', e)
  setShowDashboard(e)
}

  return (
    <div className="dashboard">
      <div className="profile">
        {user && <ProfileInfo user={user} />}
      </div>
      <div className="hikeFeed">
        <header>
          <button value='hikes' onClick={e=>{clickHandler(e.target.value)}}>My Hikes</button>
          <button value='recommended' onClick={e=>{clickHandler(e.target.value)}}>Recommended</button>
          <button value='faves' onClick={e=>{clickHandler(e.target.value)}}>Favorites</button>
        </header>
      {showDashboard === 'hikes' && (
        <HikeFeed 
          hikesData = {hikesData} 
          deleteHikes = {deleteHikes} 
          // editHikes = {editHikes}
        />
      )}
      {showDashboard === 'recommended' && (
        <Recommendations />
      )}
      {showDashboard === 'faves' && (
        <Favorites />
      )}
        
      </div>
    </div>
  )
}

export default DashboardScreen;