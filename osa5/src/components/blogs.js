function ShowBlogs(props){

  const blog = props.blogs.sort((a,b) => b.likes - a.likes)
  return(
    <div>
      {blog.map((a) =>
        <div key={a.id}>
          <p>title: {a.title} author: {a.author} url: {a.url} likes: {a.likes} <button onClick={() => props.likes(a.id)}>Like</button> added by: {a.user.name} <button style={props.user === a.user.name ? { display:"" } : { display: "none" }}  onClick={() => props.remover(a.id)}>Delete</button> </p>
        </div>
      )}
    </div>
  )
}

export default ShowBlogs