import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllPosts, updateAPost } from "../../store/posts";
import UploadPicture from "../UploadPicture";
import "./create-edit.css";

const UpdatePost = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const postId = useParams();
    const userId = useSelector(state => state?.session?.user);
    const post = useSelector(state => state?.post.list.filter(post => post.id === +postId.postId)[0]);

    const [title, setTitle] = useState(post?.title);
    const [body, setBody] = useState(post?.body);
    const [image, setImage] = useState(post?.image);
    const [showPostForm, setShowPostForm] = useState(true);
    const [showImgForm, setShowImgForm] = useState(false);
    const [errors, setErrors] = useState([]);
    const [imgErrors, setImgErrors] = useState([]);
    const [displayErrors, setDisplayErrors] = useState(true);

    useEffect(() => {
        if (title) localStorage.setItem("title", title);
        if (body) localStorage.setItem("body", body);
        if (image) localStorage.setItem("image", image);
    }, [dispatch, title, body, image]);

    useEffect(() => {
        const localStorageCaption = localStorage.getItem("title");
        const localStorageCaptio = localStorage.getItem("body");
        const localStorageCapti = localStorage.getItem("image");
        setTitle(localStorageCaption);
        setBody(localStorageCaptio);
        setImage(localStorageCapti);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const err = [];

        if (!title || title === " " || title === "  ") err.push("Please provide a title.");
        if (title?.length > 75) err.push("Please provide a title 75 characters or less.");
        if (!body || body === " " || body === "  ") err.push(" Please provide a body to your post.");
        if (body?.length > 255) err.push("Please provide shorter body that is 255 characters or less.");
        if (err) setImgErrors(err)
        if (err) setErrors(err)

    }, [image, title, body])


    const handleEditSubmit = (e) => {
        e.preventDefault();

        if (imgErrors.length) {
            setDisplayErrors(true);
        } else {
            const newPost = {
                id: postId.postId,
                "userId": userId.id,
                "title": title,
                "body": body,
                "image": image,
                "updated_at": new Date(),
            };

            dispatch(getAllPosts());
            dispatch(updateAPost(newPost));
        }

        history.push('/');
    }

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

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
        setShowPostForm(true);
    };



    return (
        <div className="page">
            <div className="form-wrapperr">
                <div className="create-title">
                    <h2>Edit Your Post</h2>
                </div>
                <div className="post-container">
                    <div className="create-post-title">
                        <button id="post-bttn" onClick={handlePostTab}>Post</button>
                        <button id="post-bttn" onClick={handleImgTab}>Images</button>
                    </div>
                    {showPostForm && (
                        <form onSubmit={handleEditSubmit}>
                            <ul className="errors">
                                {displayErrors && errors?.map(error => {
                                    return <li className="li" key={error}>
                                        <div>
                                            {error}
                                        </div>
                                    </li>
                                })}
                            </ul>
                            <div className="title-div">
                                <div className="title-label">
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={e => setTitle(e?.target?.value)}
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
                                <button onClick={handleImgTab} id="post-btn">Edit Image</button>
                            </div>
                        </form>
                    )}
                    {showImgForm && (
                        <form onSubmit={handleEditSubmit}>
                            <ul className="errors">
                                {displayErrors && imgErrors?.map(error => {
                                    return <li className="li" key={error}>
                                        <div>
                                            {error}
                                        </div>
                                    </li>

                                })}
                            </ul>
                            <div className="title-div">
                                <div className="title-label">
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
                                <img className="update-post-img" src={image} alt="edited"
                                    onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }}
                                />
                            </div>
                            <UploadPicture setImagee={setImage} />
                            <div className="btn-div">
                                {/* <button onClick={handlePostTab} id="post-btn">Edit Post</button> */}
                                <button disabled={errors?.length > 0 || imgErrors?.length > 0 ? true : false} id="post-btn">Post Edit</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="right-containerr">
                <div className="communitiess">
                    <div className="head">Posting to Pettit</div>
                    <p className="rulz">1. Remember the animal</p>
                    <p className="rulz">2. Behave like you would normally</p>
                    <p className="rulz">3. Provide sources for others work</p>
                    <p className="rulz">4. Don't duplicate others content</p>
                    <p className="rulz">5. Read the room</p>
                </div>

                <div className="createe">
                    <div className="links">
                        <h5>Personal Links</h5>
                        <a href='https://github.com/k-dodsonknapp'>GitHub</a>
                        <a href="https://www.linkedin.com/in/kenneth-dodson-knapp-97029022a/">LinkedIn</a>
                        <a href="https://angel.co/u/kenneth-dodson-knapp">AngelList</a>
                    </div>
                    <div className="links">
                        <h5>Previous Projects</h5>
                        <a href='https://notes-takker.herokuapp.com/'>NoteTakker</a>
                        <a href='http://step-by-step-app.herokuapp.com/'>Step-by-Step</a>
                        <a href='https://carra.herokuapp.com/'>Carra</a>
                    </div>
                </div>
                <div className="me">
                    <p>Developed by: Kenneth Dodson-Knapp</p>
                </div>
            </div>
        </div>
    )
};

export default UpdatePost;