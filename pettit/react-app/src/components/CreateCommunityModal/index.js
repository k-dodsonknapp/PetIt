import React, { useState } from 'react'
import { Modal } from '../../Context/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";
import './createCommModal.css';

function CreatCommunityModal({ showCreateModal, setShowCreateModal }) {
    const [communityName, setCommunityName] = useState('p/');
    console.log(communityName)

    return (
        <Modal onClose={() => setShowCreateModal(false)}>
            <div className='create-comm-div'>
                <div className='modal-label'>
                    <p>Create a community</p>
                    <button className='exit-comm-modal'><AiOutlineClose className='close-btn-icon'/></button>
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
                    <div className='community-type'>
                        <h4>Community Type</h4>
                        <div className='type-of-comm'>
                            <input
                                type='radio'
                                value={`21 ${""} Public`}
                            />
                            <BsFillPersonFill className='type-icon'/><span className='comm-types-label'> Public</span><span className='type-description'> Anyone can view, post, and comment to this community</span>
                        </div>
                        <div className='type-of-comm'>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <BsEye className='type-icon'/><span className='comm-types-label'> Restricted</span><span className='type-description'> Anyone can view this community, but only approved users can post</span>
                        </div>
                        <div className='type-of-comm'>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <IoMdLock className='type-icon'/><span className='comm-types-label'> Private</span><span className='type-description'> Only approved users can view and submit to this community</span>
                        </div>
                    </div>
                </form>
                <div className='cancel-create-btn-div'>
                    <button>Cancel</button>
                    <button>Create Community</button>
                </div>
            </div>
        </Modal>
    )
}

export default CreatCommunityModal;