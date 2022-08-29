import { useState } from "react";
import { likeblogs } from "../reducers/blogsReducer";
const Blog = (props) => {
  const [show, setShow] = useState("");
  
  const handleLikes = async (id) => {
    
    const blog = props.blogs.find((n) => n.id === id)

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    }
    likeblogs(blogObject, id)
    
    dispatch(notice(`you liked ${blog.title} by ${blog.author}`,3))
  }

  return (
    <li className="blog">
      <p>Title {props.blog.title}</p>
      <p>Author {props.author}</p>
      <button onClick={() => setShow("show")}>show more</button>
      <p style={show === "show" ? { display: "" } : { display: "none" }}>
        URL {props.blog.url}
      </p>
      <p style={show === "show" ? { display: "" } : { display: "none" }}>
        Likes {props.blog.likes}
      </p>
      <button
        style={show === "show" ? { display: "" } : { display: "none" }}
        onClick={handleLikes}
      >
        like
      </button>
    </li>
  );
};

export default Blog;
