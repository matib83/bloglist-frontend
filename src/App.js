import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [succeedMessage, setsucceedMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Hook para obtener todos los blogs de la BD
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Hook que se ejecuta cuando se renderiza el componente App, si hay datos 
  // en local Storage, los recupero
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setsucceedMessage(`a new blog "${blogObject.title}" by ${blogObject.author} added`)
      setTimeout(() => {
        setsucceedMessage(null) 
      }, 5000)
    } catch({response}) {
      setErrorMessage('Error to insert a new blog: '+response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handLeLogin = async (event) => {
    event.preventDefault()
    try {
      // console.log('logging in with', username, password)
      const user = await loginService.login({ username, password })

      //Almaceno usuario en el local Srorage
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setsucceedMessage(`welcome ${user.name}`)
      setTimeout(() => {
        setsucceedMessage(null)
      }, 1000)
    } catch(error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

   const handleLogout = () => {
    setUser(null) // Elimino el token almacenado en la variable de estado
    blogService.setToken(user.token)  // Elimino el token almacenado en la variable del modulo de blogService
    window.localStorage.removeItem('loggedBlogAppUser') // Elimino el token almacenado en localStorage
  }

  console.log(blogs)

  // sort by title
  blogs.sort((a, b) => {
  const titleA = a.title.toUpperCase(); // ignore upper and lowercase
  const titleB = b.title.toUpperCase(); // ignore upper and lowercase
  if (titleA < titleB) {
    return -1
  }
  if (titleA > titleB) {
    return 1
  }
  // names must be equal
  return 0
  })

// sort by likes
  blogs.sort((a, b) => a.likes - b.likes)

  return (
    <div>
      {
        user === null
        ?
          <div>
            <h1>Log in to application</h1> 
            <Notification message={errorMessage} selector={'Error'} />
            <LoginForm
                handLeLogin={handLeLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />
          </div>
        : 
        <div>
          <h1>blogs</h1>
          <Notification message={succeedMessage} selector={'Success'} />
          <Notification message={errorMessage} selector={'Error'} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>Cerrar sesión </button>
          </p>
            <Togglable buttonLabel="create new blog">
              <CreateBlogForm
                addBlog={addBlog}
                title={title} setTitle={setTitle}
                author={author} setAuthor={setAuthor}
                url={url} setUrl={setUrl}
              />
            </Togglable>

          { blogs.map(blog => <Blog key={blog.id} idBlog={blog.id} title={blog.title} author={blog.author} url={blog.url} likes={blog.likes} username={blog.user.username} setBlogs={setBlogs} user={user.username}/>) }
        </div>
      }
    </div>
  )
}

export default App
