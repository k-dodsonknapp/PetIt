import React, { useState } from 'react'
import { Modal } from '../../Context/Modal';
import './createCommModal.css';

function CreatCommunityModal({ showCreateModal, setShowCreateModal }) {
    const [communityName, setCommunityName] = useState('p/');
    console.log(communityName)

    return (
        <Modal onClose={() => setShowCreateModal(false)}>
            <div className='create-comm-div'>
                <div className='modal-label'>
                    <p>Create a Community</p>
                    <button>X</button>
                </div>
                <form>
                    <div className='comm-name-label'>
                        <h3>Name</h3>
                        <h6>Community names including capitalization cannot be changed.</h6>
                    </div>
                    <div className='comm-name-input'>
                        <input
                            type='text'
                            name='communityName'
                            value={communityName}
                            onChange={e => setCommunityName(e.target.value)}
                        // placeholder={"p/"}
                        ></input>
                        <h6>{ } Characters remaining</h6>
                    </div>
                    <div className='community-type'>
                        <h4>Community Type</h4>
                        <div className='public-comm-div'>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <span> Public</span><span> Anyone can view, post, and comment to this community</span>
                        </div>
                        <div className='restrict-comm-div'>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <span> Restricted</span><span> Anyone can view this community, but only approved users can post</span>
                        </div>
                        <div className='private-comm-div'>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <span> Private</span><span> Only approved users can view and submit to this community</span>
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