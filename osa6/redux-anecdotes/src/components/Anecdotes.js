import { voteAnecdotes } from '../reducers/anecdoteReducer'
import {notice} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdote = ({anecdote, handleClick}) => {
    return(
    <li>
    {anecdote.content} has {anecdote.votes} votes <button onClick={handleClick}>like</button>
    </li>
    )
}
const Anecdotes = (props) => {
   // const dispatch = useDispatch()
   // const anecdotes = useSelector(state => state.anecdotes)

    const vote = (id) => {
        const current = props.anecdotes.find(n => n.id === id)
        const newObject = {
            content: current.content,
            id: current.id,
            votes: current.votes + 1 
          }
        props.voteAnecdotes(newObject,id)
        props.notice(`you liked ${current.content}`,2)
       
    }

//const anecdotes2 = props.anecdotes
//anecdotes.sort((a,b) => b.votes - a.votes)
const sorted = [...props.anecdotes].sort((a,b) => b.votes - a.votes)
    return(
        <ul>
            <h2>Anecdotes</h2>
            {sorted.map(anecdote =>
        <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote.id)}
    />
            )}
        </ul>
    )
}
const mapDispatchToProps = {
    voteAnecdotes,
    notice
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes
    }
  }

  const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Anecdotes)
  export default ConnectedAnecdotes