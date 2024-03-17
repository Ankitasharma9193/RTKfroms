import React from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsExcerpt = ({ post }) => {
  return (
    <div><article key={post.id}>
        <h3>{ post.title }</h3>
        <p>{ post.content }</p>
        <p className='postCredit'>
        { post.authorId &&
            <PostAuthor authorId={post.authorId}></PostAuthor>
        } <br/>
        <TimeAgo  timeStamp={post.date} />
        </p>

        <ReactionButtons post={post} />   
 </article></div>
  )
}

export default PostsExcerpt;