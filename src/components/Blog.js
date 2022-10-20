import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ idBlog, title, author, url, likes, username, setBlogs, user }) => {
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

  const remove = async () => {
    console.log('Borrar el blog: ', title)
    console.log('El nombre del usuario que lo creó es:', username)
    console.log('Tu nombre de usuario es:', user)
    if (window.confirm(`Desea eliminar el blog ${ title } by ${author}?`)) {
      await blogService.deleteBlog(idBlog)
      const updateBlog = await blogService.getAll()
      setBlogs( updateBlog )
    }
  }

  return (
    <div style={blogStyle}>
      {visible? 
        <div> {title} by {author} <button onClick={toggleVisibility}>view</button> </div> 
      : 
        user===username?
        <>
          <div> {title} by {author} <button onClick={toggleVisibility}>hide</button> </div> 
          <div> {url} </div> 
          <div> likes: {likes} <button onClick={addLike}>like</button> </div> 
          <div> {username} </div> 
          <div> <button className="button" onClick={remove}>remove</button> </div>
        </>
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