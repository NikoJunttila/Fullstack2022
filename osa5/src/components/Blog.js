import { useState } from "react"

const Blog = ({blog, onclick}) => {
const [show, setShow] = useState("")

    return (
    <li className="blog">
    <p>Title {blog.title}</p>
    <p>Author {blog.author}</p>
    <button onClick={() => setShow("show")}>show more</button>
    <p style={show === "show" ? { display:"" } : { display: "none" }}>URL {blog.url}</p>
    <p style={show === "show" ? { display:"" } : { display: "none" }}>Likes {blog.likes}</p>
    <button style={show === "show" ? { display:"" } : { display: "none" }} onClick={onclick}>like</button>
    </li>
    )
  }
  
  export default Blog