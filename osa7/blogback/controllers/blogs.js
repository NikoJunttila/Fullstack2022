const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

/*
const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer")){
    return authorization.substring(7)
  }
  return null
} */



blogsRouter.get("/",async (request, response) => {
    const blogs = await Blog.
    find({}).populate("user", {username:1, name:1})

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  }
  else {
    response.status(404).end()
  }
})
blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if(!request.token || !decodedToken.id) {
        return response.status(401).json({error: "token is missing or"})
      } else if (decodedToken.id !== blog.user.toString()){
        return response.status(403).json({error: "user can only delete its own blogs"})
      } else {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
}
})
blogsRouter.post("/:id/comments", async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = request.body.comment
  blog.comments = blog.comments.concat(comment)
  await blog.save()
  response.status(200).json(comment)
})
blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.comments)
  }
  else {
    response.status(404).end()
  }
})

  blogsRouter.post("/",async (request, response) => {
      const body = request.body
      //const token = getTokenFrom(request)
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if(!request.token || !decodedToken.id) {
        return response.status(401).json({error: "token is missing or invalid"})
      }
      const user = await User.findById(decodedToken.id)
      //const user = await User.findById(body.userId)

      if (!body.title){
        return response.status(400).json({error: "title missing"})
      }
      if (!body.url){
        return response.status(400).json({error: "url missing"})
      }
      if (!body.likes){
        body.likes = 0
      }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })
      
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
      })
  
      blogsRouter.put('/:id', async (request, response) => {
        const blog = await Blog.findById(request.params.id)
        
          const body = request.body
          let newLikes = 0
          if(body.likes){
            newLikes = body.likes
          }
          const newBlog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: newLikes,
            user: blog.user
          }
          const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true})
          const changedBlog = await res.populate('user',{ username: 1, name: 1 })
          response.status(200).json(changedBlog.toJSON())
        })


  module.exports = blogsRouter