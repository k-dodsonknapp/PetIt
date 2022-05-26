import React from 'react'
import './communityCard.css'

function CommunityCard({ community }) {
  return (
    <div className='community-card'>
      <div>
        <div>
          <button className='community-btn'>
            p/{community.community_name}
          </button>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default CommunityCard;