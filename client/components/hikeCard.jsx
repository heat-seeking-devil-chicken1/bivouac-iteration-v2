import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import EditHikeScreen, {handleUpdate} from '../screens/editHikeScreen.jsx';
import {TiDeleteOutline} from 'react-icons';


const HikeCard = ({hike, deleteHikes, editHikes}) => {

  const navigate = useNavigate()

  
  const [edit, setIsEdit] = useState(false);


  return (
    <div className='hikeCard'>
      {edit && <EditHikeScreen hike={hike} editHikes={editHikes} edit={edit} setIsEdit={setIsEdit} />}
      {!edit && <div >
      <p id='date'>{hike.date}</p>
      <div className='titleBox'>
        <h2>{hike.title}</h2>
      </div>
      <br></br>
      <p id='notes'>{hike.notes}</p>
      <br></br>
      <div className='hikeStats'>
        <div id='locationBox'>
          <p>Location</p>
          <p id='hikeLocation'><b>{hike.location}</b></p>
        </div>
        <hr></hr>
        <div id='distanceBox'>
          <p>Distance</p>
          <p id='distance'><b>{hike.distance} miles</b></p>
        </div>
        <hr></hr>
        <div id='difficultyBox'>
          <p>Difficulty</p>
          <p><b>{hike.difficulty}</b></p>
        </div>
        <hr></hr>
        <div id='crowdsBox'>
          <p>Crowds</p>
          <p><b>{hike.crowds}</b></p>
        </div>
      </div>
      <button className='deleteHike' onClick={() => deleteHikes(hike._id)}>
        Delete Hike
      </button>
      <button
        className='editHike'
        onClick={() =>
          setIsEdit(true)
        }
      >
        Edit Hike
      </button>
     </div>}
    </div> 
  )}

{/* <Button onClick={showModal}>Edit</Button>
        {/* {showModal && <EditModal id={id} title={title} date={date} type={type} location={location} distance={distance} difficulty={difficulty} crowds={crowds} notes={notes}/>} */}

      {/* <Modal title="Edit Hike" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} id="editModal" >
        <div id='editModal' className="addHikeScreen">
            <div className="signupScreen-container">
            <h1>{title}</h1>
            <input className="newHikeInputs" type="text" id="title" name="title" placeholder="Title" required />Title
            <input className="newHikeInputs" type="text" id="location" name="location" placeholder="Zion National Park" required />Location
            <textarea className="newHikeInputs" id="notes"></textarea>
            <select name="hikeType" id="hikeType">
              <option value="dayHike">Day Hike</option>
              <option value="thruHike">Thru-Hike</option>
              <option value="sectionHike">Section Hike</option>
              <option value="summitHike">Summit Hike</option>
              <option value="sectionHike">Section Hike</option>
            </select>
            <input className="newHikeInputs" id="date" type="date" />
            <input className="newHikeInputs" type="number" id="distance" name="distance" placeholder="10" required />
            <input type="range" min="1" max="10"  className="slider newHikeInputs" id="difficulty" /> Difficulty
            <input type="range" min="1" max="10" className="slider newHikeInputs" id="crowds" /> Crowds
          </div>
        </div>
      </Modal> */}
       {/* <div className="comment-and-like">
        <input type="text" className="comment"/>
        <button className="likeButton"></button> */}
      {/* </div> */}

export default HikeCard