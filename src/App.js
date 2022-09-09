import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Hook para obtener todos los base
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const HandleLogin = async (event) => {
    event.preventDefault()
    try {
      // console.log('logging in with', username, password)
      const user = await loginService.login({ username, password })
      
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} />

      <form onSubmit={HandleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <p>
          <button type="submit">login</button>
        </p>
      </form>

      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default App
