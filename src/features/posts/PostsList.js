import React from 'react';
import { useSelector } from 'react-redux';
import { selectedAllPosts } from './postSlice'

const PostsList = () => {
  const  posts = useSelector(selectedAllPosts);

  const renderPosts = posts.map(post => (
    <article key={post.id}>
       <h3>{ post.title }</h3>
       <p>{ post.content }</p>
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