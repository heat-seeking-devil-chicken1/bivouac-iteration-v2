import React, {useEffect, useState} from 'react';
import axios from 'axios';

const FaveCard = ({favesInfo}) => {
  const {
    title,
    state,
    location,
    duration,
    shortDescription,
    latitude,
    longitude,
  } = favesInfo;
  // console.log('state:', state);
  const deleteFave = async (e) => {
    // used to prevent Form setting default
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user._id;
    const faveid = favesInfo._id;
    console.log('userid in faveCard:', userid);
    console.log('faveid in faveCard:', faveid);

    // const body = {
    //   userid,
    //   faveid
    // };
  
    console.log('before put request to delete fave');
    try {
      const response = await axios.put(`/api/users/favorites/${userid}/${faveid}`)/*, body, { proxy: {
        host: 'localhost',
        port: 3000}});*/
      console.log('deleted one fave successfully');
    }
    catch (err){
      console.log('error in deleteFave function: ', err)
    }
  }
  // console.log('faveCards started running')
  return (
    <div className='faveCard recFavCard'>
      <div>{title}</div> 
      <div>Location: {location}, {state} </div>
      <div>Duration: {duration} </div>
      Description: {shortDescription}
      <form>
        <input type='submit' name='submit' value='Delete' onClick={deleteFave}/>
      </form>
    </div>
  );
}

export default FaveCard;

/*title: 'string',
shortDescription:'string',
state
duration: 'string'
latitude:'string'
longitude:'string'
location:'string'
*/
  
