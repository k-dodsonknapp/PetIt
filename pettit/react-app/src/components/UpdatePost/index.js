import { useState } from "react";
import { useSelector } from "react-redux";


const CreatePost = () => {
    const userId = useSelector(state => state.session.user)
    const post = useSelector(state => state.post)
    console.log(post['list'])
    console.log(userId.id)

    const [title, setTitle] = useState()

    return (
        <div className="editPage">
            <div className="edit-project-form">
                    <form>
                        <div className="label-input-container">
                            <div className="label-input">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    // onChange={e => setTitle(e.target.value)}
                                ></input>
                            </div>
                            <div id="body" className="label-input">
                                <label>Body</label>
                                <textarea
                                    type="text"
                                    name="body"
                                    value={""}
                                    // onChange={e => setBody(e.target.value)}
                                />
                            </div>
                            <div className="label-input">
                                <label>Image:</label>
                                <input
                                    type="text"
                                    name="titleImage"
                                    value={""}
                                    // onChange={e => setTitleImage(e.target.value)}
                                />
                            </div>
                            <div className="label-input">
                                {/* <select name="category" onChange={e => setCategory(e.target.value)}>
                                    <option value='Circuits'>Circuits</option>
                                    <option value='Workshop'>Workshop</option>
                                    <option value='Craft'>Craft</option>
                                    <option value='Cooking'>Cooking</option>
                                    <option value='Living'>Living</option>
                                    <option value='Outside'>Outside</option>
                                    <option value='Teachers'>Teachers</option>
                                </select> */}
                            </div>
                            <div className="btn-div">
                                <button className="submit-comment" onClick={""}>Edit Supplies</button>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
};

export default CreatePost;