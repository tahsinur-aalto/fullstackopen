import React, {useState} from 'react'

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

export default LoginForm
