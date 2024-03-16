import { configureStore } from "@reduxjs/toolkit";
import postReducers from '../features/posts/postSlice';
import userReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: {
        posts: postReducers,
        users: userReducer
    }
});