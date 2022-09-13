import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Hook para obtener todos los blogs de la BD
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
        likes: likes
      }
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes(0)
    } catch({response}) {
      setErrorMessage('Error to insert a new blog: '+response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const HandleLogin = async (event) => {
    event.preventDefault()
    try {
      // console.log('logging in with', username, password)
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const renderLoginForm = () => (
    <form onSubmit={HandleLogin}>
      <div>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button>
        Login
      </button>
    </form>  
  )

  const renderCreateBlogForm = () => (
    <>
      <form onSubmit={addBlog}>
      <input
        placeholder='Title'
        value={title}
        onChange={({target}) => setTitle(target.value)}
      />
      <input
        placeholder='Author'
        value={author}
        onChange={({target}) => setAuthor(target.value)}
      />
      <input
        placeholder='Url'
        value={url}
        onChange={({target}) => setUrl(target.value)}
      />
      <input
        type = 'number'
        placeholder='Likes'
        value={likes}
        onChange={({target}) => setLikes(target.value)}
      />
      <button type="submit">save</button>
      </form>
    </>
  )

  return (
    <div>
      <Notification message={errorMessage} />

      {
        user === null
        ?
          <div>
            <h1>Log in to application</h1> 
            {renderLoginForm()}
          </div>
        : 
        <div>
          <h1>Blogs</h1>
          <p>{user.name} logged in</p>
          <p>
            {renderCreateBlogForm()}
          </p>
          <div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </div>
        </div>
      }
    </div>
  )
}

export default App
