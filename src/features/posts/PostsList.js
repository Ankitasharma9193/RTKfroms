import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postSlice';

import PostsExcerpt from './PostsExcerpt';
// ~~~~~ Below three are required when dealing with static initialState
// import PostAuthor from './PostAuthor';
// import TimeAgo from './TimeAgo';
// import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const dispatch = useDispatch();
  const  posts = useSelector(selectedAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if(postsStatus === 'idle'){
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch])

  console.log('~~~~~>>>>>>>>>>>>>>>>>',posts);

 // const renderPosts = posts.map(post => (
    // <article key={post.id}>
    //    <h3>{ post.title }</h3>
    //    <p>{ post.content }</p>
    //    <p className='postCredit'>
    //      { post.authorId &&
    //        <PostAuthor authorId={post.authorId}></PostAuthor>
    //       } <br/>
    //       <TimeAgo  timeStamp={post.date} />
    //    </p>

    //    <ReactionButtons post={post} />
       
    // </article>
    
  //));
  let content;
  const contentFromPostsExcerpt = () => {
    if(postsStatus === "loading") {
      content = <p>loading......</p>;
    } else if (postsStatus === "failed") {
      content = <p> { postsError }</p>;
    } else if (postsStatus === 'succeeded'){
      content = posts.map((post) => <PostsExcerpt id= {post.id} post = {post}></PostsExcerpt>)
    }
  }

  return (
    <section>
       <p>POSTS</p>
       {/* {renderPosts} */}
       
    </section>
  )
};

export default PostsList;