import React, { useEffect, useState } from 'react'
import { Modal } from '../../Context/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { IoMdLock } from "react-icons/io";
import './createCommModal.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CreatCommunityModal({ showCreateModal, setShowCreateModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [communityName, setCommunityName] = useState('');
    let [max, setMax] = useState(21)
    let [code, setCode] = useState("")
    const [commType, setCommType] = useState('')
    console.log(commType)
 
    const suffix = "p/"

    useEffect(() => {
        if (code === "Backspace"){
            setMax(max += 1)
        }else {
            setMax(max -= 1)
        }
    }, [max, code])

    const handleNewCommunity = (e) => {
        e.preventDefault()
        const newCommunity = {
            "community_name": communityName,
            "community_type": commType,
        }
        console.log(newCommunity)
        
    }
 
    const communityTitle = (e) => {
        setCommunityName(e.target.value)
        document.addEventListener("keydown", e => {
            if (e.code === "Backspace"){
                setCode("Backspace")
            }
        })
            if (code === "Backspace" && max < 21 && e.target.value.length >= 0){
                setMax(max += 1)
            }else if(code !== "Backspace" && e.target.value.length <= 21 && e.target.value.length >=0 ) {
                setMax(max -= 1)
            }
            
        console.log(e.code)
        // let length = e.target.value.length
        // document.addEventListener("keydown", e => {
        //     if (e.code === "Backspace" && max < e.target.maxLength && max > 0 || max === 0){
        //         if (max > -1){
        //             setMax(max += 1)
        //         }
        //     }else if (max <= e.target.maxLength && max >= 0 && e.code !== "Backspace" || max === 1)  {
        //         if (max > -1){

        //             setMax(max -= 1)
        //         }
        //     }
            
        // })
        // console.log(length)
        // setCommunityName(e.target.value)
        // if (length ) {
        //     setMax(max -= 1)
        // }
    }

    const radioChange = (e) => {
        setCommType(`${suffix}${e.target.value}`);
    }
    console.log(communityName)

    return (
        <Modal onClose={() => setShowCreateModal(false)}>
            <div className='create-comm-div'>
                <div className='modal-label'>
                    <p>Create a community</p>
                    <button className='exit-comm-modal' onClick={() => setShowCreateModal(false)}><AiOutlineClose className='close-btn-icon' /></button>
                </div>
                <form className='comm-form' onSubmit={handleNewCommunity}>
                    <div className='comm-name-label'>
                        <h3>Name</h3>
                        <h5>Community names including capitalization cannot be changed.</h5>
                    </div>
                    <div className='comm-name-input'>
                        <input
                            id='communityName'
                            type='text'
                            name='communityName'
                            value={communityName}
                            onChange={communityTitle}
                            maxLength={21}
                        // placeholder={"p/"}
                        ></input>
                        <h6>{max} Characters remaining</h6>
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
                <div className='cancel-create-btn-div'>
                    <button className='cancel-comm-btn' onClick={() => setShowCreateModal(false)}>Cancel</button>
                    <button className='create-comm-btn'>Create Community</button>
                </div>
                </form>
            </div>
        </Modal>
    )
}

export default CreatCommunityModal;