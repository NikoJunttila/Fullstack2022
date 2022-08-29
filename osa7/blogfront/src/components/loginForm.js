import { notice } from "../reducers/notificationReducer"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser, logOutter  } from "../reducers/currentUserReducer"
import Toggle from "./Toggle"
import { useSelector } from "react-redux"


const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = useSelector(state => state.currentUser)

  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
     dispatch(loginUser(username,password))
      setUsername("")
      setPassword("")
      dispatch(notice(`logged in ${username}`,3))
    }
const handleUsernameChange = (event) => {
  setUsername(event.target.value)

}
const handlePasswordChange = (event) => {
  setPassword(event.target.value)
}
const logOut = () => {
  dispatch(logOutter())
  dispatch(notice("logged out"))
  }
if(user.length === 0){
  return (
    <Toggle buttonLabel="Log in">
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            id="username"
          ></input>
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button type="submit" id="login-button" className="myButton">
          login
        </button>
      </form>
    </div>
    </Toggle>
  )}
  else {
    return(
      <div>
      <p>
        {user.name} logged in <button className="myButton" onClick={logOut}>Logout</button>
      </p>
    </div>
    )
  }
}

export default LoginForm
