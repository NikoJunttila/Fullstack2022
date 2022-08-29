import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert';


const Notification = () => {
const notification = useSelector(state => state.notifications)
  return (
    <div>
      {(notification &&
      <Alert variant="success">
        {notification}
      </Alert>)}
    </div>
  )
}


export default Notification