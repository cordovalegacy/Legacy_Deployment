import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Registration = () => {

    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({ //initial state needed to control input values and reset after sumission
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const changeHandler = (e) => { //handles input change
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const registrationHandler = (e) => {
        const newUser = {username: user.username, email: user.email, password: user.password, confirmPassword: user.confirmPassword} //passing verified data
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/users/register", //posts to route and registers user upon success
                newUser, //req.body
                { withCredentials: true }) //requries authentication
            .then((res) => {
                console.log("Registered User: ", res.data)
                setUser({ //initial state needed to control input values and reset after sumission
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                setErrors({}) //reset
                navigate('/computers/login')
            })
            .catch((err) => {
                console.log(err)
                console.log("Failed Registration: ", err.response.data.errors)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='login-registration'>
            <form onSubmit={registrationHandler} className='login-registration-form'>
                <h1 id='login-heading-h1'>Register</h1>
                <div id='login-form-description'>
                    <input onChange={changeHandler} name="username" value={user.username} type="text" placeholder="Enter username (full name)" />
                    {errors.username ? <span className='red'>{errors.username.message}</span> : null}
                    <input onChange={changeHandler} name="email" value={user.email} type="text" placeholder="Enter email address" />
                    {errors.email ? <span className='red'>{errors.email.message}</span> : null}
                    <input onChange={changeHandler} name="password" value={user.password} type="password" placeholder="Enter Password" />
                    {errors.password ? <span className='red'>{errors.password.message}</span> : null}
                    <input onChange={changeHandler} name="confirmPassword" value={user.confirmPassword} type="password" placeholder="Confirm Password" />
                    {errors.confirmPassword ? <span className='red'>{errors.confirmPassword.message}</span> : null}
                </div>
                <input id='login-form-button' type="submit" value={"Register"} />
                <Link to={'/computers/login'}>Already have an account? Click Here</Link>
            </form>
        </div>
    )
}

export default Registration