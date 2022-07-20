import React, {useEffect, useState} from 'react'


const recsCard = ({hikeInfo}) => {
  const {
    title,
    state,
    location,
    duration,
    shortDescription,
    latitude,
    longitude,
  } = hikeInfo;

  const saveFav = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user._id

    const body = {
      title,
      state,
      location,
      duration,
      shortDescription,
      latitude,
      longitude,
      userid
    };
  
    //console.log('before post request')
    try {
      const response = await axios.post('/api/favorites', body, { proxy: {
        host: 'localhost',
        port: 3000}});
      console.log('added to favorites successfully');
    }
    catch (error){
      console.log('error in saveFav function')
    }
  }
    
  return (
    <div className='recsCard'>
      {title} Location: {location} Duration: {duration} Description: {shortDescription}
      <form onSubmit={saveFav}>
        <input type='submit' name='submit' value='Add to Favorites' />
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
  
