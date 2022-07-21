import React from 'react'

const ProfileInfo = ({user}) => {
  console.log('user ', user)
  return (
    <div className="profileInfo">
        {/* <div id='profilePic'></div> */}
        <img id='profilePic' src='https://lcdn.sportiva.com/pub/media/ambassador/ambassador/Ambassador_Bio_Image_Alex_Honnold_2018.jpg'></img>
        <div id="profileUserData">
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.location}</div>
        </div>
    </div>
  )
}

export default ProfileInfo;