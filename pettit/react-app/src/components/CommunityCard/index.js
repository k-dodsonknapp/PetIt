import React from 'react'
import './communityCard.css'

function CommunityCard({ community }) {
  return (
    <div className='community-card'>
      {/* <li className='community-li'> */}

        <button className='community-btn'>
          p/{community.community_name}
        </button>
      {/* </li> */}
    </div>
  )
}

export default CommunityCard;