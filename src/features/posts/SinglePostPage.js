import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import { Link, useParams } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
  const { postId } = useParams();
  console.log('in single page postId:  ~~~~~',postId)

  const post = useSelector((state) => selectPostById(state, Number( postId) ));
  console.log('in single page post ~~~~~',post)

  if(!post ){
    return (
        <section>
            <div>Sorry! Post not found ....</div>
        </section>
    )
  }
  return (
    <div>
        <article key={post.id}>
            <h3>{ post.title }</h3>
            <p>{ post.body }</p>
            <p className='postCredit'>
                <Link to={`/post/edit/${post.id}`} style= {{ color: "whitesmoke"}}>Edit the Post ....</Link>
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
        </article>
    </div>
  )
}

export default SinglePostPage;