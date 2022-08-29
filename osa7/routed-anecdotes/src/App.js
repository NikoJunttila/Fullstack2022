import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,useParams, useNavigate,
} from "react-router-dom"
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>
        <Link to={`/anecdotes/${anecdote.id}`}>
        {anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()
  
const content2 = {
  type: content.type,
  value: content.value,
  onChange: content.onChange
}
const author2 = {
  type: author.type,
  value: author.value,
  onChange: author.onChange
}
const info2 = {
  type: info.type,
  value: info.value,
  onChange: info.onChange
}

  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    
    navigate("/")
  }
const reset2 = () => {
 content.reset()
 author.reset()
 info.reset()
}
//type={content.type} value={content.value} onChange={content.onChange} 
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content2}/>
        </div>
        <div>
          author
          <input {...author2} />
        </div>
        <div>
          url for more info
          <input {...info2} />
        </div>
       <button>create</button><input onClick={reset2} type="reset" defaultValue="Reset"></input>
      </form>
    </div>
  )

}
const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author} </h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info} </p>

    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    const newObject = {
      author: anecdote.author.value,
      content: anecdote.content.value,
      info: anecdote.info.value,
      votes: 0,
      id: anecdote.id
    }
    setAnecdotes(anecdotes.concat(newObject))
    setNotification(`a new anecdote ${anecdote.content.value} created!`)
    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
      {notification}
      <Menu />
      <Routes>
      <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
      <Route path="/about" element={<About />} />
      <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      
      </Router>
      <Footer />
    </div>
  )
}

export default App
