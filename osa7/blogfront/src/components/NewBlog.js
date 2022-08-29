import { useState } from "react"
import { createblog } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"
import { notice } from "../reducers/notificationReducer"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function NewBlog() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState("")
  const navigate = useNavigate()
  const addBlog = (event) => {
    event.preventDefault()
   const newBlog = ({
      title: title,
      author: author,
      url: url,
      likes: likes,
    })
    dispatch(createblog(newBlog))
    dispatch(notice(`added ${newBlog.title}`,3))
    setTitle("")
    setAuthor("")
    setUrl("")
    setLikes("")
    navigate("/blogs")
  }
  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }
  const handleLikesChange = (event) => {
    console.log(event.target.value)
    setLikes(event.target.value)
  }
  return (
      <Form onSubmit={addBlog}>
        <Form.Group>
         <Form.Control id="title"
            value={title}
            onChange={handleTitleChange}
            type="text"
            placeholder="title"></Form.Control>
          <Form.Control  id="author"
            value={author}
            onChange={handleAuthorChange}
            type="text"
            placeholder="author"></Form.Control>
          <Form.Control  id="url"
            value={url}
            onChange={handleUrlChange}
            type="text"
            placeholder="url"></Form.Control>
          <Form.Control  id="likes"
            value={likes}
            onChange={handleLikesChange}
            type="number"
            placeholder="likes"></Form.Control>
     
        <Button id="addBlog" type="submit">
            add
          </Button> 
        
        </Form.Group>
      </Form>
  )
}

export default NewBlog
