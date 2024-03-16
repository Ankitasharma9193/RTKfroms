import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
       // date: sub(new Date(), { minutes: 10 }).toISOString(),
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
       // date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
];

const posts = createSlice({
    name: 'posts',
    initialState,
    reducers : {
        addPost : { // reducer function
            reducer(state, action){ //usually we cannot modify state directly, but in RTk the immer function takes care of it.
                state.push(action.payload);
            },
            prepareCallBack(title, content) { // callback function to set the payload
                // this payload coming from AddPostsForm, dispatch
                // through this we can process and send the data.
                return{
                    id: nanoid(),
                    title,
                    content
                }
            }
        }
    }
});

export const selectedAllPosts = (state) => state.posts;
export const { addPost } = posts.actions; // action creators
export default posts.reducer; //reducer

