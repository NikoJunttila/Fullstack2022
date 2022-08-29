import {useEffect} from "react"
import Notification from "./components/Notification"
import ShowBlogs from "./components/blogs"
import LoginForm from "./components/loginForm"
import NewBlog from "./components/NewBlog"
import { useDispatch} from "react-redux";
import {initializeblogs} from "./reducers/blogsReducer"
import { initializeUsers } from "./reducers/userReducer"
import { initializeCurrentUser } from "./reducers/currentUserReducer"
import NavBar from "./components/navBar"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import Home from "./components/home"
import Users from "./components/users"
import UsersBlogs from "./components/usersBlogs"
import SingleBlog from "./components/singleBlog"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers()) 
  }, [dispatch]) 
  useEffect(() => {
    dispatch(initializeblogs()) 
  }, [dispatch]) 
  useEffect(()=>{
    dispatch(initializeCurrentUser())
  },[dispatch])

  return (
    <Router>
    <div className="container">
      <NavBar />
      <Notification />
    <Routes>
     <Route path="/blogs/:id" element={<SingleBlog />} />
     <Route path="/users/:id" element={<UsersBlogs />} />
     <Route path="/blogs" element={<ShowBlogs />} />
     <Route path="/newblog" element={ <NewBlog /> } />
     <Route path="/" element={ <Home /> } />
     <Route path="/users" element={ <Users /> } />  
      </Routes>

    </div>
    </Router>
  )
}

export default App
