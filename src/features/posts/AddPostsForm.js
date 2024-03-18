import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice'
import { addPost } from './postSlice';

const AddPostsForm = () => {
    const dispatch = useDispatch();

    const [ title, setTitleValue ] = useState('');
    const [ authorId, setAuthorId ] = useState('');
    const [ content, setContent ] = useState('');

    const  authors = useSelector(selectAllUsers);
    console.log(authors);
    const onTitleChange = (event) => setTitleValue(event.target.value);
    const onAuthorChange = (event) => setAuthorId(event.target.value);
    const onContentChange = (event) => setContent(event.target.value);

    const onSavePostClicked = () => {
        if(title && content){
            console.log(title , content, authorId)
            dispatch(
                addPost(
                    title, 
                    content,
                    authorId)
            )
            setContent('');
            setTitleValue('');
        }
    };

    const authorOptions = authors.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    
    const canSave = Boolean(title) && Boolean(content) && Boolean(authorId);
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
                <select id='postAuthor'
                    value= { authorId}
                    onChange={ onAuthorChange }
                >
                    <option value=''>
                    </option>
                    {authorOptions}
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
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostsForm;