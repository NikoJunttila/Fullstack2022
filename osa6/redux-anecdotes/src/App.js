import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import { initializeAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [dispatch]) 

  return (
    <div>
     <Notification />
     <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App