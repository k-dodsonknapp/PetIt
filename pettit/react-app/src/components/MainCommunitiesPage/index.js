import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommunities } from '../../store/communities';

function MainCommunitiesPage() {
    const dispatch = useDispatch();
    const communities = useSelector(state => state.communities);
    const communitiesArray = Object.values(communities)
    console.log(communitiesArray)

    useEffect(() => {
        dispatch(getAllCommunities())
    },[dispatch])
  return (
    <div>
        {communitiesArray.map(community => (
            <ul>
                <li>
                    {community.community_name}
                </li>
            </ul>
        ))}
    </div>
  )
}

export default MainCommunitiesPage;