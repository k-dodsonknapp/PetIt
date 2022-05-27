import React from 'react'
import { Modal } from '../../Context/Modal';
import './createCommModal.css';

function CreatCommunityModal({ showCreateModal, setShowCreateModal }) {
    return (
        <Modal onClose={() => setShowCreateModal(false)}>
            <div className='create-comm-div'>
                <div>
                    <p>Create a Community</p>
                    <button>X</button>
                </div>
                <form>
                    <input
                        type='text'
                        name='communityName'
                        value={`/p${""}`}
                        onChange={e => e.target.value}
                        placeholder={"p/"}
                    />
                    
                </form>
            </div>
        </Modal>
    )
}

export default CreatCommunityModal;