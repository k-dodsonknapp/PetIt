import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAPost, getAllPosts } from "../../store/posts";
import "./createPost.css"

const CreatePost = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state?.session?.user)

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [showPostForm, setShowPostForm] = useState(true)
    const [showImgForm, setShowImgForm] = useState(false)
    // const [droppedImg, setDroppedImg] = useState('')
    const [errors, setErrors] = useState([])
    const [imgErrors, setImgErrors] = useState([])


    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    useEffect(() => {
        const images = [
            'https://api.time.com/wp-content/uploads/2017/04/science-says-your-pet-good-your-mental-health.jpg?w=720&quality=85',
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lionel-animals-to-follow-on-instagram-1568319926.jpg?crop=0.922xw:0.738xh;0.0555xw,0.142xh&resize=640:*',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF2jgWbzJwqYqMZxccEs65tAeyRYjrTP9JEw&usqp=CAU.png',
            'https://www.treehugger.com/thmb/r9aSKZpsKqd_0FLO9fYp06GcD3k=/2344x1559/filters:fill(auto,1)/backlit-cheetah-cubs-in-ndutu-conservation-area--tanzania--east-africa-1203982703-fb64f9e943714215b031adc2f8481d60.jpg',
            'https://cdn.mamamia.com.au/wp/wp-content/uploads/2017/08/02155632/cost-of-owning-a-dog.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGZncTEG-HX2dZBenwpx9UTZp6suhNq4XWNA&usqp=CAU..png',
            'https://navs.org/wp-content/uploads/bb-plugin/cache/bunny-landscape.jpg',
            'https://aldf.org/wp-content/uploads/2018/05/lamb-iStock-665494268-16x9-e1559777676675-1200x675.jpg',
            'https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1145794687.jpg',
            'https://cms.bbcearth.com/sites/default/files/2021-02/2g24k0k80001000.png',
            'https://www.sciencenews.org/wp-content/uploads/2018/04/041418_reviews_animals_main.jpg',
            'https://static01.nyt.com/images/2020/04/13/opinion/13stoneWebnew/13stoneWebnew-mediumSquareAt3X.jpg',
            'https://images.wsj.net/im-218281?width=1280&size=1.png'
        ]
        const i = Math.floor(Math.random() * 13)
        setImage(images[i])
    }, [])

    useEffect(() => {
        const err = []
        if (body.length > 250 || body.length < 5) {
            err.push("Your body cannot be longer than 250 characters or shorter than 5 characters.")
        }
        if (title.length > 50 || title.length < 3) {
            err.push("Your post must have a title no longer than 50 characters.")
        }

        setErrors(err)

    }, [title, body])


    useEffect(() => {
        const err = []
        if (title.length > 50 || title.length < 3) {
            err.push("Your post must have a title.")
        }
        if (!(image.includes('https') && image.includes('.png') || image.includes('.jpg') || image.includes('.jpeg'))) {
            err.push('Please use .png, .jpg, or .jpeg file type')
        }
        if (body.length > 250 || body.length < 5) {
            err.push("Your post must have a body.")
        }
        setImgErrors(err)

    }, [image, title, body])


    const handlePostSubmit = async (e) => {
        e.preventDefault();

        // if (!droppedImg) {
        //     setShowImgForm(true)
        // }
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

    // useEffect(() => {
    //     setDroppedImg()
    // }, [setDroppedImg])

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
        <div className="page">
            <div className="form-wrapperr">
                <div className="create-title">
                    <h2>Create a Post</h2>
                </div>
                <div className="post-containerr">
                    <div className="create-post-title">
                        <button id="post-bttn" onClick={handlePostTab}>Post</button>
                        <button id="post-bttn" onClick={handleImgTab}>Images</button>
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
                                {/* <button onClick={handleCancel}>Cancel</button>  disabled={ errors.length > 0 || imgErrors.length > 0 ? true : false} */}
                                {/* {errors.length > 0 && imgErrors > 0 && ( */}
                                <button onClick={handleImgTab} id="post-btn">Add Image</button>
                                {/* )}/ */}
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
                            <div className="edit-imagee">
                                <img className="img-tagee" src={image} alt="edited"
                                    onError={(e) => { e.target.src = 'https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'; e.target.onError = null; }}

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
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                />
                            </div>
                            <div className="btn-div">
                                {/* <button onClick={handleCancel}>Cancel</button> */}
                                <button disabled={errors.length > 0 || imgErrors.length > 0 ? true : false} id="post-btn">Post</button>
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

                <div>

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
}

export default CreatePost;