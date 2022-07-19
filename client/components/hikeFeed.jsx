import React, {useState} from 'react'
import HikeCard from './hikeCard';
//import {hikes} from '../data.js'
import uuid from 'react-uuid';

const HikeFeed = ({hikesData, deleteHikes, editHikes}) => {



  if (!hikesData.length) return (
    <div>Sorry, no hikes found! </div>
  );

  console.log('deleteHikes in HikeFeed: ', deleteHikes)
  return (
    <div id="hikeCardContainer">
      {
        hikesData.reverse().map((hike) => (
          <HikeCard key={uuid()} editHikes= {editHikes} deleteHikes={deleteHikes} hike={hike} />
        ))
      }
    </div>
  )
}

export default HikeFeed;