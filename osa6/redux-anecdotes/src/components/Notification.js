import { connect } from "react-redux"

const Notification = (props) => {
 // const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    <div>
     <p style={style}>{props.notification}</p> 
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  }
}
const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications