import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommunities } from "../../store/communities";
import CommunityCard from "../CommunityCard";
import "./mainCommunitiesPage.css";

function MainCommunitiesPage() {
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities);
  const communitiesArray = Object.values(communities);

  useEffect(() => {
    dispatch(getAllCommunities());
  }, [dispatch]);
  return (
    <div className="community-main-div">
      <ul className="community-ol">
        <li className="community-label-li">
          <p>Communities For You</p>
        </li>
        {communitiesArray.map((community, i) => (
          <div key={community.id} className="main-communities-feed">
            <CommunityCard community={community} i={i} />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MainCommunitiesPage;
