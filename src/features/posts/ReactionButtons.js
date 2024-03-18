import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    // console.log('in the reaction',post);
    const dispatch = useDispatch();
    return(
        <div>{
            Object.entries(reactionEmoji).map(([name, emoji]) => {
                // console.log(emoji)
                return(
                    <button
                        type="button"
                        key = {name}
                        className="reactionButton"
                        onClick={() => 
                            dispatch(reactionAdded({ postId: post.id, reaction: name}))
                        }        
                    >
                    {emoji} {post.reactions[name] || ''}
                    </button>)
                }
            )
        }</div> 
    )
}

export default ReactionButtons;