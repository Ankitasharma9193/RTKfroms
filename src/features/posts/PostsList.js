import React from 'react';
import { useSelector } from 'react-redux';
import { selectedAllPosts } from './postSlice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const  posts = useSelector(selectedAllPosts);
  console.log('~~~~~>>>>>>>>>>>>>>>>>',posts);

  const renderPosts = posts.map(post => (
    <article key={post.id}>
       <h3>{ post.title }</h3>
       <p>{ post.content }</p>
       <p className='postCredit'>
         { post.authorId &&
           <PostAuthor authorId={post.authorId}></PostAuthor>
          } <br/>
          <TimeAgo  timeStamp={post.date} />
       </p>

       <ReactionButtons post={post} />
       
    </article>
    
  ));

  return (
    <section>
       <p>POSTS</p>
       {renderPosts}
    </section>
  )
};

export default PostsList;