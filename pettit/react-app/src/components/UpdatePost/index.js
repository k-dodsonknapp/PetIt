import { useState } from "react";
import { useSelector } from "react-redux";


const CreatePost = () => {
    const userId = useSelector(state => state.session.user);
    const post = useSelector(state => state.post);
    console.log(post['list'])
    console.log(userId.id)

    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [image, setImage] = useState();
    const [showPostForm, setShowPostForm] = useState(true)
    const [showImgForm, setShowImgForm] = useState(false)

    const handleEdit = (e) => {
        e.preventDefault();

    }

    // const handlePostSubmit = (e) => {
    //     e.preventDefault();
    //     const newPost = {
    //         "userId": user.id,
    //         "title": title,
    //         "body": body,
    //         "image": image
    //     }
    //     dispatch(addAPost(newPost));
    //     history.push('/posts/main')
    // }

    const handleImgTab = (e) => {
        e.preventDefault();
        setShowPostForm(false);
        setShowImgForm(true)
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
                        <form onSubmit={""}>
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
                                <button id="post-btn">Post Edit</button>
                            </div>
                        </form>
                    )}
                    {showImgForm && (
                        <form onSubmit={""}>
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
                            <div className="image-div">
                                <div className="image-label">
                                    <label>Image:</label>
                                </div>
                                <input
                                    type="text"
                                    name="image"
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                />
                            </div>
                            <div className="btn-div">
                                {/* <button onClick={handleCancel}>Cancel</button> */}
                                <button id="post-btn">Post Edit</button>
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
};

export default CreatePost;