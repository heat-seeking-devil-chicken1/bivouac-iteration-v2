import React, { useState } from 'react'
import uuid from 'react-uuid';
import RecsCard from './recsCard.jsx'

const recommendations = () => {
  const [recsData, setRecsData] = useState([]);

  const getRecs = async () => {
    //save state from form
    const state = document.getElementById('state');
    //incorporate state code in URL for get request
    const endpointURL = `https://developer.nps.gov/api/v1/thingstodo?stateCode=${state}&q=hiking&limit=5&api_key=m7NetROTa7quh7nEX2sZ7nTCAffLiUQ4zGGhYJ5b`;
    //console.log('before get request')
    try {
      const recsResponse = await axios.get(endpointURL);
      //store response object.data which is a huge array of individual hike objects
      setRecsData(recsResponse.data);
    }
    catch (error){
      console.log('error in getRecs function')
    }
  }
    
  return (
    <div className='recommendations'>
      <form onSubmit={getRecs}>
        <input
          type='text'
          name='state'
          id='state'
          placeholder='CA'
          required
        />
        <input type='submit' name='submit' value='Update current location' />
      </form>
      {
        recsData.map((hikeInfo) => (
          <RecsCard key={uuid()} hikeInfo={hikeInfo} />
        ))
      }
    </div>
  );
}

export default Recommendations;

/*title: ‘string’,
shortDescription:’string’,
state
duration: ‘string’
latitude:'string’
longitude:’string’
location:’string’
*/