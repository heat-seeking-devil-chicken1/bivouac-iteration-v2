import React, {useEffect, useState} from 'react'
import uuid from 'react-uuid';

const recsList = () => {
  const [recsData, setRecsData] = useState([]);
  const [locationData, setLocationData] = useState({locationId: ''});
  const {locationId} = locationData;
  const {recsData} = recsData
  const user = JSON.parse(localStorage.getItem('user'));


  //hook for saving state info from location form
  const changeHandler = (e) => {
    console.log('handler, ', e);
    setLocationData({
      ...data,
      locationId: e.target.value,
    });
  };
  
  //incorporate state code in URL for get request
  const endpointURL = `https://developer.nps.gov/api/v1/thingstodo?stateCode=${locationID}&q=hiking&limit=10&api_key=m7NetROTa7quh7nEX2sZ7nTCAffLiUQ4zGGhYJ5b`

  //update recsData with response from axios get request
  const getRecs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const recsResponse = await axios.get(endpointURL);
      setRecsData(recsResponse.data);
    }
    catch (error){
      console.log('error in getRecs function')
    }
  }


  if (!hikesData.length) return (
    <div>Sorry, no hikes found! </div>
  );

  console.log('deleteHikes in HikeFeed: ', deleteHikes)
  return (
    <div id="recommendations">
      {
        recs.reverse().map((hike) => (
          <HikeCard key={uuid()} editHikes= {editHikes} deleteHikes={deleteHikes} hike={hike} />
        ))
      }
    </div>
  )
}

export default HikeFeed;

/*title: ‘string’,
shortDescription:’string’,
state
duration: ‘string’
latitude:'string’
longitude:’string’
location:’string’
*/

const [data, setData] = useState({
  username: '',
  password: '',
});
const { username, password } = data;



// const invokeUpdateSynced = () => {
//   updateSynced();
// };

const submitHandler = (e) => {
  const body = {
    username,
    password,
  };

  e.preventDefault();

  setData({
    username: '',
    password: '',
  });

  // invokeUpdatedSynced();

  console.log('About to fetch sync');
  fetch('/api/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify(body),
  })
    .then((resp) => {
      console.log('fetched successfully to /api/sync');
    })
    .then(() => {
      location.reload();
    })
    .catch((err) => console.log('Error: ', err));
};

return (
  <div className='Navigation'>
    {' '}
    <form onSubmit={submitHandler}>
      <input
        type='text'
        name='username'
        value={username}
        placeholder='username'
        onChange={changeHandler}
      />
      <br />
      <input
        type='password'
        name='password'
        value={password}
        placeholder='password'
        onChange={changeHandler}
      />
      <br />
      <input type='submit' name='submit' value='Add Account to Dashboard' />
    </form>
  </div>
);
}



const DashboardScreen = () => {
  const [hikesData, setHikesData] = useState([]);
  const [userData, setUserData] = useState([]);
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

const editHikes = async (
  title,
  date,
  type,
  location,
  distance,
  difficulty,
  crowds,
  notes,
  id
) => {
  console.log('hikeID in editHikes', title,
  date,
  type,
  location,
  distance,
  difficulty,
  crowds,
  notes,
  id);
  try {
    await axios.put(`api/hikes/${id}`, {
      payload: {
        title,
        date,
        type,
        location,
        distance,
        difficulty,
        crowds,
        notes,
        id
      },
    });
    getHikes();
  } catch (error) {
    console.log('error in edithikes function');
  }
};

useEffect(() => {
  getHikes();
}, []);

//console.log('in dashboard screen', {hikesData})

  return (
    <div className="dashboard">
      <div className="profile">
        {user && <ProfileInfo user={user} />}
      </div>
      <div className="hikeFeed">
        <HikeFeed hikesData = {hikesData} deleteHikes = {deleteHikes} editHikes = {editHikes}/>
      </div>
    </div>
  )
}

export default DashboardScreen;