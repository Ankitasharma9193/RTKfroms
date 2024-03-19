import React, { useState  } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useParams, useNavigate } from 'react-router-dom';


const EditPostForm = () => {
    console.log('in edit ~~~~~~~~~~~');
    const { postId } = useParams();
    const navigate = useNavigate();

    const dispatch =  useDispatch();

    const post = useSelector(state => selectPostById(state, Number(postId)));
    const authors = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [authorId, setAuthorId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChange = (event) => setTitle(event.target.value);
    const onAuthorChange = (event) => setAuthorId(Number(event.target.value));
    const onContentChange = (event) => setContent(event.target.value);

    const authorOptions = authors.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    
    const canSave = Boolean(title) && Boolean(content) && Boolean(authorId) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if(canSave){
            try{
                setRequestStatus('pending');
                dispatch(updatePost({ id: post.id, title, body: content, userId: authorId, reactions: post.reactions  }));
                alert("Your changes have been saved!");

                setTitle('');
                setContent('');
                setAuthorId('');
                navigate(`/post/${postId}`);
            } catch(error) {
                console.log(`Failed to save post:  ${error}`);
            } finally {
                setRequestStatus('idle');
            }
        }
    }

    const onDeletePostClicked = () => {
        try{
            setRequestStatus('pending');
            dispatch(deletePost({ id: post.id }))
            
            setTitle('');
            setContent('');
            setAuthorId('');
            navigate(`/`);
        } catch (error){
            console.log(`Error deleting the post: ${error}`);
        } finally {
            setRequestStatus('idle');
        }
    }

    return (
    <section>
        <h2>Edit the post</h2>
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

            <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
        </form>
    </section>
  )
}

export default EditPostForm;