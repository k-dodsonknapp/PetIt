import React, { useState } from 'react'
import { Modal } from '../../Context/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";
import './createCommModal.css';

function CreatCommunityModal({ showCreateModal, setShowCreateModal }) {
    const [communityName, setCommunityName] = useState('p/');
    const [commType, setCommType] = useState('')
    console.log(commType)

    const radioChange = (e) => {
        setCommType(e.target.value);
    }
    console.log(communityName)

    return (
        <Modal onClose={() => setShowCreateModal(false)}>
            <div className='create-comm-div'>
                <div className='modal-label'>
                    <p>Create a community</p>
                    <button className='exit-comm-modal' onClick={() => setShowCreateModal(false)}><AiOutlineClose className='close-btn-icon' /></button>
                </div>
                <form className='comm-form'>
                    <div className='comm-name-label'>
                        <h3>Name</h3>
                        <h5>Community names including capitalization cannot be changed.</h5>
                    </div>
                    <div className='comm-name-input'>
                        <input
                            type='text'
                            name='communityName'
                            value={communityName}
                            onChange={e => setCommunityName(e.target.value)}
                        // placeholder={"p/"}
                        ></input>
                        <h6>{ }21 Characters remaining</h6>
                    </div>
                    <div className='community-type' onChange={radioChange}>
                        <h4>Community Type</h4>
                        <div className='type-of-comm'>
                            <input
                                className='radio-pick'
                                type='radio'
                                value={`Public`}
                                checked={commType === "Public"}
                                defaultChange={radioChange}
                            />
                            <BsFillPersonFill className='type-icon' /><span className='comm-types-label'> Public</span>
                            <span className='description'> Anyone can view, post, and comment to this community</span>
                        </div>
                        <div className='type-of-comm'>
                            <input
                                className='radio-pick'
                                type='radio'
                                value={`Restricted`}
                                checked={commType === "Restricted"}
                                onChange={radioChange}
                            />
                            <BsEye className='type-icon' /><span className='comm-types-label'> Restricted</span>
                            <div className='description'> Anyone can view this community, but only approved users can post</div>
                        </div>
                        <div className='type-of-comm'>
                            <input
                                className='radio-pick'
                                type='radio'
                                value={`Private`}
                                checked={commType === "Private"}
                                onChange={radioChange}
                            />
                            <IoMdLock className='type-icon' /><span className='comm-types-label'> Private</span>
                            <div className='description'> Only approved users can view and submit to this community</div>
                        </div>
                    </div>
                </form>
                <div className='cancel-create-btn-div'>
                    <button className='cancel-comm-btn' onClick={() => setShowCreateModal(false)}>Cancel</button>
                    <button className='create-comm-btn'>Create Community</button>
                </div>
            </div>
        </Modal>
    )
}

export default CreatCommunityModal;