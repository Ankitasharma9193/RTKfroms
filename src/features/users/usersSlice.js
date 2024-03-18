import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// ~~~~~ fetching dynamic users
const initialState = [];

// const initialState = [
//     { id: '0', name: 'Dude Lebowski' },
//     { id: '1', name: 'Neil Young' },
//     { id: '2', name: 'Dave Gray' }
// ]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => { // this is like an action
    try{
       const response = await axios.get(USERS_URL);
       return [...response.data];
    } catch (error) {
       return `Error: ${error.message}`;
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectAllUsers = (state) => state.users;

// export const { addUser } = userSlice.actions;
export default  usersSlice.reducer;
