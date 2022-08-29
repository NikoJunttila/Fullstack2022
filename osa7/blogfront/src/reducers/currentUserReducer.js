import {createSlice} from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: [],
    reducers:{
        setCurrentUser:(state, action)=>{
            return action.payload
        },
        logOut:(state,action)=>{
            return action.payload
        }
       
    }
})

export const {setCurrentUser,logOut} = currentUserSlice.actions




export const initializeCurrentUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
    }
    }
  }
  export const loginUser = (username,password) => {
    return async dispatch =>{
    const user = await loginService.login({
               username: username,
               password: password
            })
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setCurrentUser(user))
    }
   }
   
   export const logOutter = () => {
    return async dispatch => {
    window.localStorage.clear()
    dispatch(logOut([]))
}
   }

  export default currentUserSlice.reducer