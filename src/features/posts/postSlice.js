import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';


// const initialState = [
//     {
//         id: '1',
//         title: 'Learning Redux Toolkit',
//         content: "I've heard good things.",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: '2',
//         title: 'Slices...',
//         content: "The more I say slice, the more I want pizza.",
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     }
// ];

const  initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => { // this is like an action
     try{
        const response = await axios.get(POSTS_URL);
        return response.data;
     } catch (error) {
        return `Error: ${error}`
     }
});
console.log('posts fetched ~~~~~', fetchPosts);


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers : {
        addPost : { // reducer function
            reducer(state, action){ //usually we cannot modify state directly, but in RTk the immer function takes care of it.
               // state.push(action.payload);
               state.posts.push(action.payload); // case of dynamic initialState
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
            // const existingPost = state.find((post) => post.id === postId);
            const existingPost = state.posts.find((post) => post.id === postId); // for dynamic initialState
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }},
// ~~~~~~~~~~~~~~~~~~ below is the dynamic  way to handle http request ----------------------------
        extraReducers(builder) { // this is part of dynamic fetchinh
            builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                //Adding date and reactions
                let min =1;
                const loadedPosts = action.payload.map((post) => {
                    post.reaction = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    post.date =  sub(new Date(), { minutes: min++ }).toISOString();

                    return post;
                });

                //Add fetched posts to the array
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
        }
    }
});

// export const selectedAllPosts = (state) => state.posts;
export const selectedAllPosts = (state) => state.posts.posts; // for dynamic  initialState
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { addPost,  reactionAdded } = postsSlice.actions; // action creators
export default postsSlice.reducer; //reducer

