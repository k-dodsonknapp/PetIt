import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addAPost, getAllPosts } from "../../store/posts";
import "./createPost.css"

const CreatePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('https://api.time.com/wp-content/uploads/2017/04/science-says-your-pet-good-your-mental-health.jpg?w=720&quality=85');
    const [showPostForm, setShowPostForm] = useState(true)
    const [showImgForm, setShowImgForm] = useState(false)
    const [droppedImg, setDroppedImg] = useState('')
    const [errors, setErrors] = useState([])
    const [imgErrors, setImgErrors] = useState([])
    
        useEffect(() => {
            dispatch(getAllPosts())
        }, [dispatch])

    useEffect(() => {
        const err = []
        if (body.length > 250 || body.length < 5) {
            err.push("Your body cannot be longer than 250 characters or shorter than 5 characters.")
        }
        if (title.length > 50 || title.length < 3) {
            err.push("Your post must have a title and cannot be longer than 50 characters.")
        }

        setErrors(err)

    }, [title, body])


    useEffect(() => {
        const err = []
        if (image.length > 100) {
            err.push('Please use .png, .jpg, or .jpeg file type')
        }
        setImgErrors(err)

    }, [image])


    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!droppedImg) {
            setShowImgForm(true)
        }
        // } else if (droppedImg.length > 0){

        const newPost = {
            "userId": user.id,
            "title": title,
            "body": body,
            "image": image,
            "updated_at": new Date(),
        }
        await dispatch(addAPost(newPost));
        await dispatch(getAllPosts())
        history.push("/posts/main")
    }

    useEffect(() => {
        setDroppedImg()
    }, [setDroppedImg])

    const handleImgTab = (e) => {
        e.preventDefault();
        setShowPostForm(false);
        setShowImgForm(true);
    }

    const handlePostTab = (e) => {
        e.preventDefault();
        if (showImgForm === true) {
            setShowImgForm(false);
        }
        setShowPostForm(true)
    }

    return (
        <div className="edit-page">
            <div className="form-wrapper">
                <div className="post-container">
                    <div className="create-post-title">
                        <h3>Create a post</h3>
                        <button onClick={handleImgTab}>Images</button>
                        <button onClick={handlePostTab}>Post</button>
                    </div>
                    {showPostForm && (
                        <form onSubmit={handlePostSubmit}>
                            <ul className="errors">
                                {errors.length > 0 && errors.map(error => {


                                    return <li className="li" key={error}>
                                        <div>
                                        {error}
                                        </div>
                                    </li>
                                    
                                })}
                            </ul>
                            <div className="title-div">
                                <div className="title-label">
                                    {/* <label>Title:</label> */}
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder={"Title"}
                                />
                            </div>
                            <div className="body-div">
                                <div className="body-label">
                                    <label>Body:</label>
                                </div>
                                <textarea
                                    type="text"
                                    name="body"
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
                                />
                            </div>
                            <div className="btn-div">
                                {/* <button onClick={handleCancel}>Cancel</button> */}
                                <button disabled={errors.length > 0 ? true : false} id="post-btn">Post</button>
                            </div>

                        </form>
                    )}
                    {showImgForm && (
                        <form onSubmit={handlePostSubmit}>
                            <ul className="errors">
                                {imgErrors.length > 0 && imgErrors.map(error => {
                                    return <li className="li" key={error}>
                                        <div>
                                            {error}
                                        </div>
                                    </li>

                                })}
                            </ul>
                            <div className="title-div">
                                <div className="title-label">
                                    {/* <label>Title:</label> */}
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder={"Title"}
                                />
                            </div>
                            <div className="edit-image">
                                <img className="img-tage" src={image} alt="edited" />
                            </div>
                            <div className="image-div">
                                {/* <div id="drop_zone" onDrop={e => dropHandler(e)} onDragOver={e => dragOverHandler(e)}>
                                    <p>Drag one or more files to upload</p>
                                </div> */}
                                <div className="image-label">
                                    <label>Image:</label>
                                </div>
                                <input
                                    type="text"
                                    name="image"
                                    value={droppedImg}
                                    onChange={e => setImage(e.target.value)}
                                />
                            </div>
                            <div className="btn-div">
                                {/* <button onClick={handleCancel}>Cancel</button> */}
                                <button disabled={errors.length > 0 ? true : false} id="post-btn">Post</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="right-container">
                <div className="communities">

                </div>

                <div className="create"></div>
            </div>
        </div>
    )
}

export default CreatePost;