import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handLeLogin,
  username,
  setUsername,
  password,
  setPassword
  }) => {
  return (
    <div>
      <form onSubmit={handLeLogin}>
        <div> 
          username: 
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>  
    </div>
  )
}

LoginForm.propTypes = {
  handLeLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm