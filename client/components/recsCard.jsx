import React, {useEffect, useState} from 'react';
import axios from 'axios';

const RecsCard = ({hikeInfo}) => {
  const {
    title,
    state,
    location,
    duration,
    shortDescription,
    latitude,
    longitude,
  } = hikeInfo;
  const saveFave = async (e) => {
    // used to prevent Form setting default
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user._id;

    const body = {
      title,
      state,
      location,
      duration,
      shortDescription,
      latitude,
      longitude,
    };
    console.log('before put request to add fave');
    try {
      const response = await axios.put(`/api/users/saveFave/${userid}`, body, { proxy: {
        host: 'localhost',
        port: 3000}});
      console.log('added to favorites successfully');
    }
    catch (err){
      console.log('error in saveFave function: ', err)
    }
  }
  console.log('resCards stared running')
  return (
    <div className='recsCard'>
      <div>Title: {title}</div>
      {location &&(
        <div>Location: {location}</div>
      )}
      {/* <div>Location: {location}</div> */}
      {duration &&(
        <div>Duration: {duration}</div>
      )}
      
      <div>Description: {shortDescription}</div>
      <form>
        <input type='submit' name='submit' value='Add to Favorites' onClick={saveFave}/>
      </form>
    </div>
  );
}

export default RecsCard;

/*title: ‘string’,
shortDescription:’string’,
state
duration: ‘string’
latitude:'string’
longitude:’string’
location:’string’
*/
  
