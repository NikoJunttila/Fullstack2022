import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeblogs, addComment } from "../reducers/blogsReducer";
import { notice } from "../reducers/notificationReducer";


function SingleBlog(){
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(blog => blog.id === id)
    const [loader,setLoader] = useState(null)
    const [comments,setComments] = useState("")
    const [newComment, setNewComment] = useState("")

    const dispatch = useDispatch()
const handleLikes = async () => {
  const blog = blogs.find((n) => n.id === id)
  const blogObject = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user,
    likes: blog.likes + 1,
  }
  dispatch(likeblogs(blogObject, id))
  dispatch(notice(`you liked ${blog.title} by ${blog.author}`,3))
}
const addNewComment = async(event)=>{
  event.preventDefault()
  const commentObject = {
    comment: newComment
  }
  setNewComment("")
  dispatch(addComment(commentObject, id))
  dispatch(notice("added new comment",3))
  setComments(comments.concat(newComment))
}

const handleNewComment = (event) => {
  setNewComment(event.target.value)
}




    if(blog && !loader){
        setLoader(true)
        setComments(blog.comments)
      }
    if(loader){
    return(
        <div className="container">
           <h2>{blog.title} by {blog.author}</h2>
           <br></br>
           <p>{blog.url}</p>
           <p>likes:{blog.likes}<button onClick={handleLikes}>Like</button></p>
           <p>added by {blog.user.name}</p>
        <h2>Comments</h2>
        <form onSubmit={addNewComment}>
        <input
         type="text" placeholder="comments" value={newComment} onChange={handleNewComment}>
          </input><button type="submit">add comment</button>
        </form>
        <ul>
    {comments.map((a) =>(
     <li key={a}>{a}</li> 
     ))}
     </ul>
      </div>
    )}
    else {
        return(<div>
            unexpected error happened. please reload page
        </div>)
    }
}

export default SingleBlog