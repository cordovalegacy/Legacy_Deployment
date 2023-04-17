import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import emailjs from '@emailjs/browser'

const CustomForm = () => {

    const [user, setUser] = useState({})
    const [open, setOpen] = useState({
        personal: true,
        budget: false,
        performance: false,
        aesthetic: false,
        confirm: false
    })
    const [custom, setCustom] = useState({})

    const openHandler = (id) => {
        if (id === 'personal') {
            setOpen({
                personal: true,
                budget: false,
                performance: false,
                aesthetic: false,
                confirm: false
            })
        }
        else if (id === 'budget') {
            setOpen({
                personal: false,
                budget: true,
                performance: false,
                aesthetic: false,
                confirm: false
            })
        }
        else if (id === 'performance') {
            setOpen({
                personal: false,
                budget: false,
                performance: true,
                aesthetic: false,
                confirm: false
            })
        }
        else if (id === 'aesthetic') {
            setOpen({
                personal: false,
                budget: false,
                performance: false,
                aesthetic: true,
                confirm: false
            })
        }
        else if (id === 'confirm') {
            setOpen({
                personal: false,
                budget: false,
                performance: false,
                aesthetic: false,
                confirm: true
            })
        }
    }

    const changeHandler = (e) => {
        console.log("Event: ", e)
        setCustom({ ...custom, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:8000/api/computers/customs',
                // order, <= this is the order object to send required model fields to backend
                { withCredentials: true })
            .then((res) => {
                console.log(res)
                console.log("Posted Custom Order: ", res.data)
                // emailjs.send('service_className', 'contact_form', order, 'LW4RMYIvhRvf0Fz9c')
                //     .then((res) => {
                //         console.log("Email Sent: ", res.data)
                //     }, (err) => {
                //         console.log(err)
                //     })
                navigate("/computers/confirmation")
            })
            .catch((err) => {
                console.log("Something went wrong: ", err)
                // setErrors(err.response.data.err.errors)
            })
    }

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/users', //gets logged in user
                { withCredentials: true }) //requires authentication
            .then((res) => {
                console.log("Loggin in user (CustomForm.js): ", res.data)
                setUser(res.data) //set state to logged in user info
                setCustom({...custom, email: res.data.email})
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <form className='custom-form-container-outer'>
            <h2>Let's Build!</h2>
            <div className='custom-form-container-inner'>
                <div className='custom-form-wrapper-left'>
                    {
                        open.personal === true ?
                            <button type='button' className='custom-form-buttons-open'>Personal</button> :
                            <button type='button' className='custom-form-buttons' onClick={() => openHandler('personal')}>Personal</button>
                    }
                    {open.budget === true ?
                        <button type='button' className='custom-form-buttons-open'>Budget</button> :
                        <button type='button' className='custom-form-buttons' onClick={() => openHandler('budget')}>Budget</button>
                    }
                    {open.performance === true ?
                        <button type='button' className='custom-form-buttons-open'>Performance</button> :
                        <button type='button' className='custom-form-buttons' onClick={() => openHandler('performance')}>Performance</button>
                    }
                    {open.aesthetic === true ?
                        <button type='button' className='custom-form-buttons-open'>Aesthetic</button> :
                        <button type='button' className='custom-form-buttons' onClick={() => openHandler('aesthetic')}>Aesthetic</button>
                    }
                    {open.confirm === true ?
                        <button type='button' className='custom-form-buttons-open'>Confirm</button> :
                        <button type='button' className='custom-form-buttons' onClick={() => openHandler('confirm')}>Confirm</button>
                    }
                </div>
                <div className='custom-form-wrapper-right'>
                    {open.personal === true ?
                        <>
                            <h3 className='caption'>Tell us about you!</h3>
                            <div className='custom-form-input-container'>
                                <div className='form-groups'>
                                    <label htmlFor="fullName">Name: </label>
                                    <input type="text" name="fullName" onChange={changeHandler} />
                                </div>
                                <div className='form-groups'>
                                    <label htmlFor="email">Email: </label>
                                    <input type="text" name="email" value={user.email} onChange={changeHandler} />
                                </div>
                                <div className='form-groups'>
                                    <label htmlFor="phoneNumber">Phone: </label>
                                    <PhoneInput
                                        name='phoneNumber'
                                        country="US"
                                        defaultCountry='US'
                                        placeholder="(xxx)-xxx-xxxx"
                                        onChange={changeHandler}
                                        value={user.phoneNumber}
                                    />
                                </div>
                            </div>
                        </>
                        : null
                    }
                    {
                        open.budget === true ?
                            <>
                                <h3 className='caption'>Tell us about you!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="fullName">Name: </label>
                                        <input type="text" name="fullName" />
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="email">Email: </label>
                                        <input type="text" name="email" value={user.email} />
                                    </div>
                                </div>
                            </> :
                            null
                    }
                    {
                        open.performance === true ?
                            <>
                                <h3 className='caption'>Tell us about you!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="fullName">Name: </label>
                                        <input type="text" name="fullName" />
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="email">Email: </label>
                                        <input type="text" name="email" value={user.email} />
                                    </div>
                                </div>
                            </> :
                            null
                    }
                    {
                        open.aesthetic === true ?
                            <>
                                <h3 className='caption'>Tell us about you!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="fullName">Name: </label>
                                        <input type="text" name="fullName" />
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="email">Email: </label>
                                        <input type="text" name="email" value={user.email} />
                                    </div>
                                </div>
                            </> :
                            null
                    }
                    {
                        open.confirm === true ?
                            <>
                                <h3 className='caption'>Tell us about you!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="fullName">Name: </label>
                                        <input type="text" name="fullName" />
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="email">Email: </label>
                                        <input type="text" name="email" value={user.email} />
                                    </div>
                                </div>
                            </> :
                            null
                    }
                </div>
            </div>
        </form >
    )
}

export default CustomForm