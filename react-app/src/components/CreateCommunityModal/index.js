import React, { useState } from "react";
import { Modal } from "../../Context/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";
import "./createCommModal.css";

function CreatCommunityModal({ showCreateModal, setShowCreateModal }) {
  const suffix = "p/";
  let [communityName, setCommunityName] = useState(suffix);
  let [max, setMax] = useState(21);
  let [code, setCode] = useState("");
  const handleNewCommunity = null

  const communityTitle = (e) => {
    setCommunityName(e.target.value);
    document.addEventListener("keydown", (e) => {
      if (e.code === "Backspace") {
        setCode("Backspace");
      } else {
        setCode("");
      }
    });
    if (
      code === "Backspace" &&
      e.target.value.length < 23 &&
      e.target.value.length >= 0
    ) {
      setMax((max += 1));
    } else if (
      code !== "Backspace" &&
      (e.target.value.length < 23 || e.target.value.length >= 0)
    ) {
      setMax((max -= 1));
    }
  };

  return (
    <Modal onClose={() => setShowCreateModal(false)}>
      <div className="create-comm-div">
        <div className="modal-label">
          <p>Create a community</p>
          <button
            className="exit-comm-modal"
            onClick={() => setShowCreateModal(false)}
          >
            <AiOutlineClose className="close-btn-icon" />
          </button>
        </div>
        <form className="comm-form" onSubmit={handleNewCommunity}>
          <div className="comm-name-label">
            <h3>Name</h3>
            <h5>Community names including capitalization cannot be changed.</h5>
          </div>
          <div className="comm-name-input">
            <input
              id="communityName"
              type="text"
              name="communityName"
              value={communityName}
              onChange={communityTitle}
              maxLength={23}
            ></input>
            <h6>{max} Characters remaining</h6>
          </div>
          <div className="community-type">
            <h4>Community Type</h4>
            <div className="type-of-comm">
              <input
                id="public"
                name="comm-type"
                className="radio-pick"
                type="radio"
                value="Public"
              />
              <BsFillPersonFill className="type-icon" />
              <span className="comm-types-label"> Public</span>
              <span className="description">
                {" "}
                Anyone can view, post, and comment to this community
              </span>
            </div>
            <div className="type-of-comm">
              <input
                id="restricted"
                name="comm-type"
                className="radio-pick"
                type="radio"
                value="Restricted"
              />
              <BsEye className="type-icon" />
              <span className="comm-types-label"> Restricted</span>
              <div className="description">
                {" "}
                Anyone can view this community, but only approved users can post
              </div>
            </div>
            <div className="type-of-comm">
              <input
                id="private"
                name="comm-type"
                className="radio-pick"
                type="radio"
                value="Private"
              />
              <IoMdLock className="type-icon" />
              <span className="comm-types-label"> Private</span>
              <div className="description">
                {" "}
                Only approved users can view and submit to this community
              </div>
            </div>
          </div>
          <div className="cancel-create-btn-div">
            <button
              className="cancel-comm-btn"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </button>
            <button className="create-comm-btn">Create Community</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreatCommunityModal;
