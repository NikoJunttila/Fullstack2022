import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"

const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  Toggle.displayName = "Toggle"

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  Toggle.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="myButton" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="myButton" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Toggle
