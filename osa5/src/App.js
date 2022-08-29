import blogService from "./services/blogs"
import loginService from "./services/login"
import { useState, useEffect, useRef } from "react"
import Notification from "./components/Notification"
import ShowBlogs from "./components/blogs"
import LoginForm from "./components/loginForm"
import Toggle from "./components/Toggle"
import NewBlog from "./components/NewBlog"


function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(response => {
      setBlogs(blogs.concat(response))
    })
      .catch(error => {
        if(error.response.statusText === "Bad Request"){
          setErrorMessage(error.response.data.error)
        }
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
    setErrorMessage(`added ${blogObject.title} by ${blogObject.author}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const handleDelete = async (id) => {
    const blog = blogs.find(n => n.id === id)
    if(window.confirm(`are you sure you want to delete ${blog.title} ?`)){
      try{
        await blogService
          .remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setErrorMessage(
          `Deleted ${blog.title}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }catch(exception){
        setErrorMessage(exception.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      }
    }
  }
  const handleLikes = async (id) => {
    const blog = blogs.find(n => n.id === id)
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    }
    const res = await blogService.update(blog.id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : res))
    setErrorMessage(`you liked ${blog.title} by ${blog.author}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch(exception) {
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logOutter = () => {
    window.localStorage.clear()
    setUser("")
    setErrorMessage("logged out")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const blogFormRef = useRef()

  return (
    <div>
      <Notification message={errorMessage} />
      {user === "" ?
        <Toggle buttonLabel="Log in"><LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        ></LoginForm></Toggle>
        :
        <div>
          <p>{user.name} logged in <button onClick={logOutter}>Logout</button></p>
          <Toggle buttonLabel="add new blog" ref={blogFormRef}>
            <NewBlog createBlog={addBlog}/>
          </Toggle>
        </div>
      }

      <p>this should show all the blogs in database:</p>
      <ShowBlogs blogs={blogs} remover={handleDelete} likes={handleLikes} user={user.name} />
    </div>
  )
}

export default App
