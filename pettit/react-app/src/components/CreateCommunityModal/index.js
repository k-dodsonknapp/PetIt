import React, { useState } from 'react'
import { Modal } from '../../Context/Modal';
import './createCommModal.css';

function CreatCommunityModal({ showCreateModal, setShowCreateModal }) {
    const [communityName, setCommunityName] = useState('p/');
    console.log(communityName)

    return (
        <Modal onClose={() => setShowCreateModal(false)}>
            <div className='create-comm-div'>
                <div>
                    <p>Create a Community</p>
                    <button>X</button>
                </div>
                <form>
                    <div>
                        <h3>Name</h3>
                        <h6>Community names including capitalization cannot be changed.</h6>
                    </div>
                    <div>

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
                        <div>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <span> Public</span>
                        </div>
                        <div>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <span> Restricted</span>
                        </div>
                        <div>
                            <input
                                type='radio'
                                value={`${""} Public`}
                            />
                            <span> Private</span>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreatCommunityModal;