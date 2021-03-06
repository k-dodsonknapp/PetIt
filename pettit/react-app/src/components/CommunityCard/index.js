import React from 'react'
import './communityCard.css'

function CommunityCard({ community, i }) {

  const joinCommunity = (e) => {
    e.preventDefault()
    console.log("HELLO")
  }
  return (
    <li className='community-li'>
      <div className='community-btn-div'>
        <button className='community-btn'>
          <span className='numbered-li'>{`${i + 1}.`}</span><span className='community-name-btn'>{` p/${community.community_name}`}</span>
        </button>
      </div>
      <div className='join-btn-div'>
        <button className='join-btn' onClick={joinCommunity}>
          Join
        </button>
      </div>
    </li>
  )
}

export default CommunityCard;