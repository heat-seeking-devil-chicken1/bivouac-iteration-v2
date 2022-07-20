import React, { useEffect, useState } from 'react'
import uuid from 'react-uuid';
import axios from 'axios';
import RecsCard from './recsCard.jsx'

const Recommendations = () => {
  const [recsData, setRecsData] = useState([]);

  const getRecs = async (e) => {

    //for forms, use preventDefault to prevent submitting from automatically refreshing the page
    e.preventDefault();
    const state = document.getElementById('state');
    console.log('state', state)
    console.log('state.value', state.value)

    //incorporate state code in URL for get request
    const endpointURL = `https://developer.nps.gov/api/v1/thingstodo?stateCode=${state.value}&q=hiking&limit=5&api_key=m7NetROTa7quh7nEX2sZ7nTCAffLiUQ4zGGhYJ5b`;
    console.log('before get request for recs')
    try {
      const recsResponse = await axios.get(endpointURL);
      //store response object.data which is a huge array of individual hike objects
      console.log('recsResponse.data: ', recsResponse)
      setRecsData(recsResponse.data.data);
 
    }
    catch (error){
      console.log('error in getRecs function: ', error)
    }
  }
  
  useEffect(() => {
    console.log('recsData', recsData)
  }, [recsData]);
  


  return (
    <div className='recommendations'>
      <form>
        <input
          type='text'
          name='state'
          id='state'
          placeholder='state abbr. ex: CA'
          required
        />
        <input type='submit' name='submit' value='Update my location' onClick={getRecs}/>
      </form>
      { recsData.length > 0 && (
        recsData.map((hikeInfo) => (
          <RecsCard key={uuid()} hikeInfo={hikeInfo} />
        ))
      )}
      { recsData.length === 0 && (
        <div>Please enter a state</div>
      )}

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