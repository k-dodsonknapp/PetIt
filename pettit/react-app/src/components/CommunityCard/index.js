import React from 'react'
import './communityCard.css'

function CommunityCard({ community, i }) {
  return (
      <li className='community-li'>
    {/* <div className='community-card'> */}

        <button className='community-btn'>
          <span className='numbered-li'>{`${i + 1}`}</span><span className='community-name-btn'>{` p/${community.community_name}`}</span>
        </button>
    {/* </div> */}
        <button className=''>
          Join
        </button>
      </li>
  )
}

export default CommunityCard;