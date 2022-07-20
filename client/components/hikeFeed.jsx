import React, {useState} from 'react'
import HikeCard from './hikeCard';
//import {hikes} from '../data.js'
import uuid from 'react-uuid';

const HikeFeed = ({hikesData, deleteHikes/*, editHikes*/}) => {



  if (!hikesData.length) return (
    <div>Sorry, no hikes found! </div>
  );

  console.log('deleteHikes in HikeFeed: ', deleteHikes)
  return (
    <div id="hikeCardContainer">
      I am hike card container/Hike feed component
      {
        hikesData.reverse().map((hike) => (
          <HikeCard key={uuid()} /*editHikes= {editHikes}*/ deleteHikes={deleteHikes} hike={hike} />
        ))
      }
      I am more
    </div>
  )
}

export default HikeFeed;