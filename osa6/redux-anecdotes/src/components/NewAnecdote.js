import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {notice} from "../reducers/notificationReducer"


const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(createAnecdote(content))

        dispatch(notice(`you added new anecdote ${content}`,5))
    }
 return (
    <form onSubmit={addAnecdote}>
        <h2>create new</h2>
        <input name="anecdote" />
        <button type="submit">add</button>
    </form>
 )
}

export default NewAnecdote
