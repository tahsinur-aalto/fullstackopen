import React, {useState} from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleUsernameChange, 
                     handlePasswordChange, handleLogin }) => (
    <div>
        <h3>log in to application</h3>
        <form onSubmit={handleLogin}>
            <div>
                username 
                <input
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
                />
            </div>
            <div>
                password 
                <input
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </div>
)

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  export default LoginForm
