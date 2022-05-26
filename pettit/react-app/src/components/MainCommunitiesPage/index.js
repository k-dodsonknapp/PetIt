import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommunities } from '../../store/communities';
import CommunityCard from '../CommunityCard';
import './mainCommunitiesPage.css'

function MainCommunitiesPage() {
    const dispatch = useDispatch();
    const communities = useSelector(state => state.communities);
    const communitiesArray = Object.values(communities)
    const numberArray = new Array();
    numberArray.fill(0)
    console.log(numberArray.fill(1, communitiesArray.length))
    // console.log(communitiesArray)

    useEffect(() => {
        dispatch(getAllCommunities());
        console.log(numberArray)

    }, [dispatch])
    return (
        <div>
            <ul className='community-ol'>
                <li className='community-label-li'>
                    <p>Communities for You</p>
                </li>
                {communitiesArray.map((community, i) => (
                    <div key={community.id} className='main-communities-feed'>
                        <span>{`${i + 1} `} </span>
                        {/* <li > */}
                            <CommunityCard community={community} />
                        {/* </li> */}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default MainCommunitiesPage;