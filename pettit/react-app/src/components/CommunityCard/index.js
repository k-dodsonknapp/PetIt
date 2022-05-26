import React from 'react'
import './communityCard.css'

function CommunityCard({ community, i }) {
  return (
    <li className='community-li'>
      {/* <div className='community-card'> */}
      <div className='community-btn-div'>
        <button className='community-btn'>
          <span className='numbered-li'>{`${i + 1}`}</span><span className='community-name-btn'>{` p/${community.community_name}`}</span>
        </button>
      </div>
      {/* </div> */}
      <div className='join-btn-div'>
        <button className='join-btn'>
          Join
        </button>
      </div>
    </li>
  )
}

export default CommunityCard;