import React from 'react'
import { Modal } from '../../Context/Modal';

function CreatCommunityModal({showLoginModal, setShowLoginModal}) {
  return (
      <Modal onClose={() => setShowLoginModal(false)}>
          <div>CreatCommunityModal</div>
      </Modal>
  )
}

export default CreatCommunityModal;