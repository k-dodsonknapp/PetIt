import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../store/posts';

function Search( {search, setSearch, searchResult, setSearchResult} ) {

    const dispatch = useDispatch();
    const posts = useSelector(state => state?.post?.list)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    useEffect(() => {
        if (search.length === 0) {
            console.log("hit")
            setSearchResult([])
        }
    }, [search, setSearchResult])

    useEffect(() => {
        if (search.length > 0) {
            let array = [];
            for(let i = 0; i < posts.length; i++) {
                let post = posts[i].title;
                if (post.includes(search) && array.length < 6){
                    array.push(posts[i]);
                    
                };
            };
            if (array.length === 0) {
                setSearchResult(['something'])
            } else {
                setSearchResult(array);
            }
        }
    }, [search, posts, setSearchResult])

  return (
    <div className='search-div'>
        <input
        placeholder='Search'
        value={search}
        type="text"
        onChange={e => setSearch(e.target.value)}
        />
    </div>
  )
}

export default Search