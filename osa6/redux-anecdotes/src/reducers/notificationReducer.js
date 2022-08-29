import { createSlice } from "@reduxjs/toolkit"


const notifSlice = createSlice({
    name:"notifications",
    initialState: null,
    reducers: {
        setNotif: (state,action) => {
            const notif = action.payload
            return notif
        },
        removeNotif: (state, action) => {
            return null
        }
    }
})

export const {setNotif, removeNotif} = notifSlice.actions

export const notice = (notification, duration) => {
    return async dispatch => {
    await dispatch(setNotif(notification))
    setTimeout(() => {
        dispatch(removeNotif())
    }, 1000 * duration)
    }
}
export default notifSlice.reducer