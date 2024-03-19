import React from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => {
    // console.log('in the excerpt',post)
  return (
    <div><article key={post.id}>
        <h2>{ post.title }</h2>
         {/* <p>{ post.content }</p> */}
        <p className='excerpt'>{post.body.substring(0, 75)} ......</p>
        <p className='postCredit'>
            <Link to={`post/${post.id}`} style={{color: 'whitesmoke'}}>View Full Post...</Link>
            {
                post.userId &&
                <PostAuthor authorId={post.userId} />
            }
            {/* { post.authorId &&
                <PostAuthor authorId={post.authorId}></PostAuthor>
            }  */}
            <br/>
            <TimeAgo  timeStamp={post.date} />
        </p>

        <ReactionButtons post={post} />   
 </article></div>
  )
}

export default PostsExcerpt;