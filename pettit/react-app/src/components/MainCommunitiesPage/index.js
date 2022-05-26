import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommunities } from '../../store/communities';
import CommunityCard from '../CommunityCard';
import './mainCommunitiesPage.css'

function MainCommunitiesPage() {
    const dispatch = useDispatch();
    const communities = useSelector(state => state.communities);
    const communitiesArray = Object.values(communities)
    console.log(communitiesArray)

    useEffect(() => {
        dispatch(getAllCommunities())
    }, [dispatch])
    return (
        <div>
            <ul className='community-ul'>
                <li className='community-label-li'>
                    <p>Communities</p>
                </li>
                {communitiesArray.map(community => (
                    <div className='main-communities-feed'>
                        
                        <li>
                            <CommunityCard community={community} />
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default MainCommunitiesPage;