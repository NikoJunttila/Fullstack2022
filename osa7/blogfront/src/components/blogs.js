import { useDispatch, useSelector } from "react-redux";
import { deleteblogs, likeblogs } from "../reducers/blogsReducer";
import { notice } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap'


function ShowBlogs() {
const dispatch = useDispatch()
const blogs = useSelector(state => state.blogs)
const user = useSelector(state => state.currentUser)
/*
const handleLikes = async (id) => {
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
} */

const handleDelete = async (id) => {
  const blog = blogs.find((n) => n.id === id)
  if (window.confirm(`are you sure you want to delete ${blog.title} ?`)) {
    dispatch(deleteblogs(id))
    dispatch(notice(`Deleted ${blog.title}`,3))
  }
}
const sorted = [...blogs].sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <p>this should show all the blogs in database:</p>
      <Table striped>
<tbody>
      {sorted.map((a) => (
        <tr key={a.id}>
          <td>
           <Link to={`/blogs/${a.id}`}>{a.title} </Link> added by:
            {a.user.name}
            <button type="button" className="btn btn-outline-secondary"
      style={ a.user.name === user.name ? { display: "" }: { display: "none" }}
              onClick={() => handleDelete(a.id)}>Delete</button>
          </td>
          
        </tr>
      ))}
      </tbody>
          </Table>
    </div>
  )
}

export default ShowBlogs
