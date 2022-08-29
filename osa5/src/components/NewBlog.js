import { useState } from "react"

function NewBlog({ createBlog }){
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setTitle("")
    setAuthor("")
    setUrl("")
    setLikes("")
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




  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          <input id="title"value={title} onChange={handleTitleChange} type="text" placeholder="title"></input><br></br>
          <input id="author" value={author} onChange={handleAuthorChange} type="text" placeholder="author"></input><br></br>
          <input id="url" value={url} onChange={handleUrlChange} type="text" placeholder="url"></input><br></br>
          <input id="likes" value={likes} onChange={handleLikesChange} type="number" placeholder="likes"></input><br></br>
        </div>
        <div>
          <button id="addBlog" type="submit">add</button>

        </div>
      </form>
    </div>
  )
}

export default NewBlog