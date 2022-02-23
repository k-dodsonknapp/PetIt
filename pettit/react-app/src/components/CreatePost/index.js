import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAPost, getAllPosts } from "../../store/posts";
import "./createPost.css"

const CreatePost = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [showPostForm, setShowPostForm] = useState(true)
    const [showImgForm, setShowImgForm] = useState(false)
    const [droppedImg, setDroppedImg] = useState('')
    console.log(droppedImg)

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            "userId": user.id,
            "title": title,
            "body": body,
            "image": image,
            "updated_at": new Date(),
        }
        dispatch(addAPost(newPost));
        dispatch(getAllPosts())
        history.push('/posts/main')
    }

    useEffect(() => {
        setDroppedImg()
    }, [setDroppedImg])

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

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

    // const handleCancel = (e) => {
    //     e.preventDefault()
    // }

    // function dropHandler(ev) {
    //     console.log('File(s) dropped');
    //     ev.preventDefault();

    //     if (ev.dataTransfer.items) {
    //         for (var i = 0; i < ev.dataTransfer.items.length; i++) {
    //             if (ev.dataTransfer.items[i].kind === 'file') {
    //                 var file = ev.dataTransfer.items[i].getAsFile();
    //                 console.log('... file[' + i + '].name = ' + file.name);
    //                 setDroppedImg(file.name)
    //             }
    //         }
    //     } else {
    //         for (var j = 0; j < ev.dataTransfer.files.length; j++) {
    //             console.log('... file[' + j + '].name = ' + ev.dataTransfer.files[j].name);
    //         }
    //     }
    // }

    // function dragOverHandler(e) {
    //     console.log('File(s) in drop zone');
    //     // Prevent default behavior (Prevent file from being opened)
    //     e.preventDefault();
    // }

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
                                <button id="post-btn">Post</button>
                            </div>
                        </form>
                    )}
                    {showImgForm && (
                        <form onSubmit={handlePostSubmit}>
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
                                    required
                                />
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
                                    required
                                />
                            </div>
                            <div className="btn-div">
                                {/* <button onClick={handleCancel}>Cancel</button> */}
                                <button id="post-btn">Post</button>
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