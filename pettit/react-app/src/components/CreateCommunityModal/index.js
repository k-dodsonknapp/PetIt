import React from 'react'
import { Modal } from '../../Context/Modal';

function CreatCommunityModal({showCreateModal, setShowCreateModal}) {
  return (
      <Modal onClose={() => setShowCreateModal(false)}>
          <div>CreatCommunityModal</div>
      </Modal>
  )
}

export default CreatCommunityModal;