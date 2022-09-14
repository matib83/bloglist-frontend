import React from 'react'

const NOTIFICATION_HANDLERS = {
  "Error": res =>
    <div className="error">
      {res}
    </div>,
  
  "Success": res =>
  <div className="success">
    {res}
  </div>,

  null: res => null,

  defaultError: res => null
}

const Notification = ({ message,selector}) => {
  if (message == null) return null
  // console.log({ message })
  // console.log({ selector })
  const handler = NOTIFICATION_HANDLERS[selector]

  return handler(message)
}

export default Notification