import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ idBlog, title, author, url, likes, username, setBlogs }) => {
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

  // continuar por acá: la idea sería que al pulsar en like, aumente en 1 la cantidad de likes del blog.
  const addLike = async () => {
    //const blog = blog.find(b => b.id === idBlog)
    //const changedNote = { }
    const changedBlog = {
      likes: likes+1
    }

    console.log('Sumar 1 like al blog: ', title)
    console.log('El ID del blog es: ', idBlog)
    console.log('Los likes actuales son: ', likes)
    console.log('Blog a actualizar: ', changedBlog)
    await blogService.update(idBlog, changedBlog)
    const updateBlog = await blogService.getAll()
    setBlogs( updateBlog )
  }

  return (
    <div style={blogStyle}>
      {visible? 
        <div> {title} by {author} <button onClick={toggleVisibility}>view</button> </div> 
      : 
        <>
          <div> {title} by {author} <button onClick={toggleVisibility}>hide</button> </div> 
          <div> {url} </div> 
          <div> likes: {likes} <button onClick={addLike}>like</button> </div> 
          <div> {username} </div> 
        </>
      }
    </div> 
)}

export default Blog