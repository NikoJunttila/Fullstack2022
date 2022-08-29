import {createSlice} from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createblog:(state,action) => {
      const newblog = action.payload
      state.push(newblog)
    },
    likeblog:(state,action)=>{
      const id = action.payload.id
      const blogToChange = state.find(n => n.id === id)
      const changedblog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog => blog.id !== id ? blog : changedblog)
    },
    setblogs:(state, action) =>{
      return action.payload
    },
    appendblog(state, action) {
      state.push(action.payload)
    },
    deleteblog(state, action){
      const id = action.payload
      return state.filter(blog => blog.id !== id)
      },
      commentBlog(state,action){
        const id = action.payload.id
        const comment = action.payload.comment
        const blogToChange = state.find(n => n.id === id)
        const changedblog = {
          ...blogToChange,
          comments: blogToChange.comments.concat(comment)
        }
        return state.map(blog => blog.id !== id ? blog : changedblog)
      }
  }
})

export const {likeblog, setblogs, appendblog, deleteblog, commentBlog} = blogSlice.actions

export const initializeblogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setblogs(blogs))
  }
}

export const createblog = content => {
  return async dispatch => {
    const newblog = await blogsService.create(content)
    dispatch(appendblog(newblog))
  }
}
export const likeblogs = (newObject, id) => {
  return async dispatch => {
    console.log(newObject ,"first")
    const updatedblog = await blogsService.update(newObject, id)
    console.log(updatedblog)
    dispatch(likeblog(updatedblog))
  }
}
export const addComment = (newObject, id) => {
  return async dispatch => {
    const newComment = await blogsService.comment(newObject,id)
    const payload = {
      comment: newComment,
      id: id
    }
    dispatch(commentBlog(payload))
  }
}
export const deleteblogs = (id) => {
  return async dispatch => {
   const deletedblog2 =  await blogsService.remove(id)
   dispatch(deleteblog(id))
  }
}

export default blogSlice.reducer