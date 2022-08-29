import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const UsersBlogs = () => {
  const [user, setUser] = useState()
  const [blogs, setBlogs] = useState([])
  const [loader, setLoader] = useState(false)
  const id = useParams().id

  useEffect(() => {
    userService
      .getAll()
      .then(data => {
        setUser(data.find(user => user.id === id))
      })
  }, [])

  if(user && !loader){
    setBlogs(blogs.concat(user.blogs))
    setLoader(true)
  }

  if(loader && blogs.length !== 0){
    return(
      <div className='user'>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  } else if(blogs.length === 0 && loader){
    return(
<div>
  <h2>{user.name}</h2>
  <p>this user has not added any blogs yet</p>
</div>
    )
  }
  else{
    return(<div>
    </div>)
  }
}
export default UsersBlogs