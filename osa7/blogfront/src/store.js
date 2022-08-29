import { configureStore } from "@reduxjs/toolkit"
import notifSlice from "./reducers/notificationReducer"
import blogSlice from "./reducers/blogsReducer"
import userSlice from "./reducers/userReducer"
import currentUserSlice from "./reducers/currentUserReducer"
const store = configureStore({
reducer: {
    notifications: notifSlice,
    blogs: blogSlice,
    users: userSlice,
    currentUser: currentUserSlice,
    }
})
export default store