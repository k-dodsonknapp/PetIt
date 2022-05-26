import React from 'react'
import { Modal } from '../../Context/Modal';
import './createCommModal.css';

function CreatCommunityModal({showCreateModal, setShowCreateModal}) {
  return (
      <Modal onClose={() => setShowCreateModal(false)}>
          <form>

          </form>
          <div className='create-comm-div'>CreatCommunityModal</div>
      </Modal>
  )
}

export default CreatCommunityModal;