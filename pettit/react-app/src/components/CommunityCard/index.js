import React from 'react'
import './communityCard.css'

function CommunityCard({community}) {
  return (
    <div className='community-card'>
        {community.community_name}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default CommunityCard;