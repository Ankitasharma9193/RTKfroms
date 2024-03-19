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
        return [...response.data];
     } catch (error) {
        return `Error fetching posts: ${error.message}`;
     }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try{
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
    } catch (error){
        return ` Error adding post: ${error.message}`;
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async(initialPost) =>{
    const { id } = initialPost;
    console.log('In the reducer',initialPost);

    try{
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
        return response.data;
    } catch (error) {
        return `Error updating post: ${error.message}`;
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async(initialPost) => {
    const {id} = initialPost;
    try{
        const response = await axios.delete(`${POSTS_URL}/${id}`, initialPost);
        if(response?.status === 200) return initialPost;

        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        console.log(`Error deleting Post: ${error.message}`);
    }
});

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
            console.log('i am receving reaction', state, action)
            const { postId, reaction } = action.payload;
            // const existingPost = state.find((post) => post.id === postId);
            const existingPost = state.posts.find((post) => post.id === postId); // for dynamic initialState
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }}
    },
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
                post.reactions = {
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
        .addCase(addNewPost.fulfilled, (state, action) => { 

           // console.log(action.payload)// this will be just one payload which we post via form
            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0
            };

            state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            if(!action.payload?.id){
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            const {id} = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter(post => post.id !== id); // the one which just updated remove that
            state.posts = [action.payload, ...posts]; // replace the  old post with the updated one
        })
        .addCase(deletePost.fulfilled, (state, action)=> {
            if(!action.payload?.id){
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            const {id} = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = [...posts];
        })
        
    }
});
// export const selectedAllPosts = (state) => state.posts;
export const selectedAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => {
    return state.posts.posts.find(post => post.id === postId);
}
// for dynamic  initialState
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { addPost,  reactionAdded } = postsSlice.actions; // action creators
export default postsSlice.reducer; //reducer

