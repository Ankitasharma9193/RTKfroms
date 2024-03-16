import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers : {
        addPost : { // reducer function
            reducer(state, action){ //usually we cannot modify state directly, but in RTk the immer function takes care of it.
                state.push(action.payload);
            },
            prepare(title, content, authorId) { // callback function to set the payload
                // this payload coming from AddPostsForm, dispatch
                // through this we can process and send the data.
                return{
                    payload:{
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        authorId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded: {
         reducer(state, action){
            console.log('i am receving')
            const { postId, reaction } = action.payload;
            const existingPost = state.find((post) => post.id === postId);
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }}
    }
});

export const selectedAllPosts = (state) => state.posts;
export const { addPost,  reactionAdded } = postsSlice.actions; // action creators
export default postsSlice.reducer; //reducer

