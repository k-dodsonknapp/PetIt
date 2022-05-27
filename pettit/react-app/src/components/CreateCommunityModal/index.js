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
                    <h3>Name</h3>
                    <h6>Community names including capitalization cannot be changed.</h6>
                    <input
                        type='text'
                        name='communityName'
                        value={communityName}
                        onChange={e => setCommunityName(e.target.value)}
                        // placeholder={"p/"}
                    ></input> 
                </form>
            </div>
        </Modal>
    )
}

export default CreatCommunityModal;