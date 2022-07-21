import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid';
import axios from 'axios';
import FaveCard from './faveCard.jsx'

const Favorites = () => {
  const [favesData, setFavesData] = useState([]);

  const getFaves = async () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user._id;

    console.log('before get request for faves')
    try {
      const favesResponse = await axios.get(`/api/users/favorites/${userid}`);

      // console.log('favesResponse.favorites: ', favesResponse.data.favorite)
      setFavesData(favesResponse.data.favorite);

    }
    catch (error){
      console.log('error in getFaves function: ', error)
    }
  }
  
  useEffect(() => {
    console.log('started get faves')
    getFaves();
  });
  


  return (
    <div className='favorites'>
      { favesData.length > 0 && (
        favesData.map((favesInfo) => (
          <FaveCard key={uuid()} favesInfo={favesInfo} />
        ))
      )}
      { favesData.length === 0 && (
        <div>Add Some Favorites!</div>
      )}

    </div>
  );
}

export default Favorites;

/*title: ‘string’,
shortDescription:’string’,
state
duration: ‘string’
latitude:'string’
longitude:’string’
location:’string’
*/