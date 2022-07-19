import React from 'react'

const ProfileInfo = ({user}) => {
  return (
    <div className="profileInfo">
        <div id='profilePic'></div>
        <div id="profileUserData">
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.location}</div>
        </div>
    </div>
  )
}

export default ProfileInfo;