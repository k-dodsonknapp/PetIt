import React from 'react'
import './communityCard.css'

function CommunityCard({ community }) {
  return (
      <li className='community-li'>
    {/* <div className='community-card'> */}

        <button className='community-btn'>
          p/{community.community_name}
        </button>
    {/* </div> */}
      </li>
  )
}

export default CommunityCard;