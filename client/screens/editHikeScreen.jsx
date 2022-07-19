import React, {useEffect} from 'react'
import axios from 'axios';
import { getHikes } from '../../server/controllers/hikeController';
import { useNavigate } from 'react-router-dom';

const EditHikeScreen = ({ hike, edit, setIsEdit }) => {
  const navigate = useNavigate()
   
  const handleUpdate = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    //get the values of the needed imputs to send to server
    const title = document.getElementById('title')
    const location = document.getElementById('location');
    const date = document.getElementById('date');
    const notes = document.getElementById('notes');
    const difficulty = document.getElementById('difficulty');
    const distance = document.getElementById('distance'); //
    const crowds = document.getElementById('crowds'); // 
    const type = document.getElementById('hikeType'); // 
    //console.log('before post request')
    //Make a post request to /api/addHike
    //body includes title, location, date, difficulty, distance, crowds
    // ( async() => {
    let response = await axios.put(`/api/hikes/${hike._id}`, { title: title.value, location: location.value, date: date.value, difficulty: difficulty.value,  crowds: crowds.value, distance: distance.value, notes: notes.value, type: type.value, userid: user._id }, 
    { proxy:{ host: 'localhost', port: 3000}})

    console.log(response)
    window.location.reload();
  }

 


  return (
    <div className="addHikeScreen">
        <div className="signupScreen-container">
        <h1>Edit your hike</h1>
        Title<input className="newHikeInputs" type="text" id="title" name="title" placeholder="Title" required defaultValue={hike.title}/>
        Location<input className="newHikeInputs" type="text" id="location" name="location" placeholder="Zion National Park" required defaultValue={hike.location}/>
        Notes<textarea className="newHikeInputs" id="notes" defaultValue={hike.notes}></textarea>
        Type<select name="hikeType" id="hikeType">
          <option value="dayHike">Day Hike</option>
          <option value="thruHike">Thru-Hike</option>
          <option value="sectionHike">Section Hike</option>
          <option value="summitHike">Summit Hike</option>
          <option value="sectionHike">Section Hike</option>
        </select>
        Date<input className="newHikeInputs" id="date" type="date" defaultValue={hike.date}/>
        Distance<input className="newHikeInputs" type="number" id="distance" name="distance" placeholder="10" required defaultValue={hike.distance}/>
        Difficulty<input type="range" min="1" max="10"  className="slider newHikeInputs" id="difficulty" defaultValue={hike.distance}/> 
        Crowds<input type="range" min="1" max="10" className="slider newHikeInputs" id="crowds" defaultValue={hike.crowds}/> 
        <button id="updateButton" onClick={() => handleUpdate()}>Update Hike</button>
      </div>
    </div>
  )
}

export default EditHikeScreen;
