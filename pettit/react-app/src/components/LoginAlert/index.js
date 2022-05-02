import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../Context/Modal';
import './loginAlert.css';

function LoginAlert({ showLoginModal, setShowLoginModal }) {
    const history = useHistory();
    const login =() => {
        history.push('/login')
    }
    const signUp =() => {
        history.push('/sign-up')
    }
    return (
        <Modal onClose={() => setShowLoginModal(false)}>
            <div className='main-modal-login-div'>
                <h1>Please</h1>
                <button id='modal-login-btn' onClick={login}> Login</button>
                <h2>Or</h2>
                <button id='modal-signup-btn' onClick={signUp}> Sign Up</button>
            </div>
        </Modal>
    )
}

export default LoginAlert;