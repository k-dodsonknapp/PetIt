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
            {communitiesArray.map(community => (
                <div>

                    <ul>
                        <li>
                            <CommunityCard community={community} />
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default MainCommunitiesPage;