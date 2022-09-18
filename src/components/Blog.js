import { useState } from 'react'

const Blog = ({ title, author, url, likes, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(true)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {visible? 
        <div> {title} by {author} <button onClick={toggleVisibility}>view</button> </div> 
      : 
        <>
          <div> {title} by {author} <button onClick={toggleVisibility}>hide</button> </div> 
          <div> {url} </div> 
          <div> likes: {likes} <button>like</button> </div> 
          <div> {username} </div> 
        </>
      }
    </div> 
)}

export default Blog