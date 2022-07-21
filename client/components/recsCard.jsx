import React, {useEffect, useState} from 'react';
import axios from 'axios';

const RecsCard = ({hikeInfo, stateInfo}) => {
  // console.log('hikeInfo.images', hikeInfo.images[0].url)
  // console.log('stateInfo:', stateInfo)
  const {
    title,
    location,
    duration,
    shortDescription,
    latitude,
    longitude,
    images
  } = hikeInfo;
  const image = hikeInfo.images[0].url;
  const {state} = stateInfo;
  // console.log('state:', state);

  
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
      images
    };
    // console.log('state inside the saveFave:', state)
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
    <div className='recFavCard'>
      <h3>{title}</h3>
      <img className='images' src={image}></img>
      {location &&(
        <div><span>Location:</span> {location}</div>
      )}
      {/* <div>Location: {location}</div> */}
      {duration &&(
        <div><span>Duration:</span> {duration}</div>
      )}
      
      <div><span>Description:</span> {shortDescription}</div>
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
  
