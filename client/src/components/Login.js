import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()

    const loginHandler = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password
                },
                {
                    withCredentials: true,
                    credentials: 'include'
                }
            )
            .then((res) => {
                console.log("Logged In User: ", res.data)
                navigate('/')
                window.location.reload()
            })
            .catch((err) => {
                console.log("Failed Login: ", err.response.data)
                setErrorMessage(err.response.data.message)
            })
    }

    return (
        <div className='login-registration'>
            <form onSubmit={loginHandler} className='login-registration-form'>
                <h3>Login</h3>
                {errorMessage ? <p className='red' >{errorMessage}</p> : null}
                <div className='logreg-form-wrapper'>
                    <input
                        name='email'
                        value={email}
                        className='logreg-input'
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Enter email address"
                    />
                    <input
                        name="password"
                        value={password}
                        className='logreg-input'
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter Password"
                    />
                </div>
                <input type="submit" className='logreg-btn' value={"Login"} />
                <Link to={'/computers/registration'} className='logreg-link'>Need to create an account? Click Here</Link>
            </form>
        </div>
    )
};

export default Login