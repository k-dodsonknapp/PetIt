import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './onePost.css'


const OnePost = () => {

    const history = useHistory();
    const post = useSelector(state => state.post)

    const handleHome = () => {
        history.push('/posts/home')
    }

    return (
        <div className="page">
            <div className="main-feed-container" >
                {/* {posts['list']?.map(post => ( */}
                    <div className="posts" >
                        <div className="left-post">
                        </div>
                        <div className="right-post">
                            <div>
                                {post.title}
                            </div>
                            <div>
                                {post.image}
                            </div>
                            <div className="button-div">
                                <button id={post.id} onClick={handleHome}>Home</button>
                            </div>
                        </div>
                    </div>
                {/* )).reverse()} */}
                <div className="comments">

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

export default OnePost;