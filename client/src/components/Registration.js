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
        const newUser = {
            username: user.username,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword
        } //passing verified data
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/users/register", //posts to route and registers user upon success
                newUser,
                {withCredentials: true} //req.body
            )
            .then((res) => {
                console.log("Registered User: ", res.data)
                setUser({ //initial state needed to control input values and reset after sumission
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                navigate('/computers/login')
                setErrors({}) //reset
            })
            .catch((err) => {
                console.log(err)
                console.log("Failed Registration: ", err)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='login-registration'>
            <form onSubmit={registrationHandler} className='login-registration-form'>
                <h3>Register</h3>
                <div className='logreg-form-wrapper'>
                    <input className='logreg-input' onChange={changeHandler} name="username" value={user.username} type="text" placeholder="Enter username (full name)" />
                    {errors.username ? <span className='red'>{errors.username.message}</span> : null}
                    <input className='logreg-input' onChange={changeHandler} name="email" value={user.email} type="text" placeholder="Enter email address" />
                    {errors.email ? <span className='red'>{errors.email.message}</span> : null}
                    <input className='logreg-input' onChange={changeHandler} name="password" value={user.password} type="password" placeholder="Enter Password" />
                    {errors.password ? <span className='red'>{errors.password.message}</span> : null}
                    <input className='logreg-input' onChange={changeHandler} name="confirmPassword" value={user.confirmPassword} type="password" placeholder="Confirm Password" />
                    {errors.confirmPassword ? <span className='red'>{errors.confirmPassword.message}</span> : null}
                </div>
                <input className='logreg-btn' type="submit" value={"Register"} />
                <Link to={'/computers/login'} className='logreg-link'>Already have an account? Click Here</Link>
            </form>
        </div>
    )
}

export default Registration