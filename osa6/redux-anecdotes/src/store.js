import { configureStore } from "@reduxjs/toolkit";

import anecdoteSlice from "./reducers/anecdoteReducer";
import notifSlice from "./reducers/notificationReducer";


const store = configureStore({
    reducer: {
        anecdotes: anecdoteSlice,
        notifications: notifSlice,
    }
})



export default store