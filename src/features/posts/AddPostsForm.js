import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addPost } from './postSlice';

const AddPostsForm = () => {
    const dispatch = useDispatch();

    const [ title, setTitleValue ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ content, setContent ] = useState('');

    // const  posts = useSelector(selectAllUsers);

    const onTitleChange = (event) => setTitleValue(event.target.value);
    const OnAuthorChange = (event) => setUserId(event.target.value);
    const onContentChange = (event) => setContent(event.target.value);

    const onSavePostClicked = () => {
        if(title && content){
            dispatch(
                addPost(
                    title, 
                    content)
            )
            setContent('');
            setTitleValue('');
        }
    };

    // const userOptions = posts.map((post) => {
    //     <option key={post.id} value={post.id}>
    //         {post.name}
    //     </option>
    // })

    return (
        <section>
            <h2>Add a Post</h2>
            <form>
                <label>Post Title :</label>
                <input
                    type= 'text'
                    name = 'input_text'
                    value = {title}
                    onChange={onTitleChange}
                />

                <label>Author :</label>
                <select id='PostAuthor'
                    name="author" 
                    value= { userId}
                    onChange={ OnAuthorChange }
                >
                    <option value=''>
                        {/* {userOptions} */}
                    </option>
                </select>

                <label>Content :</label>
                <textarea
                    name='post_content'
                    id='PostContent'
                    value={content}
                    onChange={onContentChange}
                />

                <button
                    type='button'
                    onClick={onSavePostClicked}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostsForm;