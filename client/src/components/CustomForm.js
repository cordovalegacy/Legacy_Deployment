import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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
                setCustom({ ...custom, email: res.data.email })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <form className='custom-form-container-outer'>
            <h2>Let's Build!</h2>
            {custom.budget ? <h4>Your budget is:  <span className='red'>${custom.budget}</span> </h4> : null}
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
                    {open.personal === true ? //personal tab body
                        <>
                            <h3 className='caption'>Tell us about you!</h3>
                            <div className='custom-form-input-container'>
                                <div className='form-groups'>
                                    <label htmlFor="fullName">Name: </label>
                                    <input type="text" name="fullName" className='form-input' onChange={changeHandler} />
                                </div>
                                <div className='form-groups'>
                                    <label htmlFor="email">Email: </label>
                                    <input type="text" name="email" className='form-input' value={user.email} onChange={changeHandler} />
                                </div>
                                <div className='form-groups'>
                                    <label htmlFor="phoneNumber">Phone: </label>
                                    <input
                                        type='tel'
                                        name='phoneNumber'
                                        pattern="[0-9]{10}"
                                        placeholder="xxx-xxx-xxxx"
                                        className='form-input'
                                        onChange={changeHandler}
                                        value={user.phoneNumber}
                                    />
                                </div>
                            </div>
                        </>
                        : null
                    }
                    {
                        open.budget === true ? //budget tab body
                            <>
                                <h3 className='caption'>Tell us about your budget!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="budget">Budget: </label>
                                        <select name="budget" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="1000">$1000</option>
                                            <option value="1500">$1500</option>
                                            <option value="2000">$2000</option>
                                            <option value="3000">$3000</option>
                                            <option value="4000">$4000+</option>
                                        </select>
                                    </div>
                                </div>
                            </> :
                            null
                    }
                    {
                        open.performance === true ? //performance tab body
                            <>
                                <h3 className='caption'>Tell us about you!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="cpu">CPU: </label>
                                        <select name="cpu" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="ryzen 5 5600x">Ryzen 5 5600x</option>
                                            <option value="ryzen 7 5800x">Ryzen 7 5800x</option>
                                            <option value="ryzen 5 7600x">Ryzen 5 7600x</option>
                                            <option value="ryzen 7 7700x">Ryzen 7 7700x</option>
                                            <option value="ryzen 9 7900x">Ryzen 9 7900x</option>
                                        </select>
                                        {custom.cpu === "ryzen 5 5600x" || custom.cpu === "ryzen 5 7600x" ? <p>Gaming</p> : null}
                                        {custom.cpu === "ryzen 7 5800x" || custom.cpu === "ryzen 7 7700x" ? <p>Gaming & Streaming</p> : null}
                                        {custom.cpu === "ryzen 9 7900x" ? <p>Content Creation</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="gpu">GPU: </label>
                                        <select name="gpu" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="rtx 3060">RTX 3060</option>
                                            <option value="rtx 3080">RTX 3080</option>
                                            <option value="rtx 4070">RTX 4070</option>
                                            <option value="rtx 4080">RRTX 4080</option>
                                            <option value="rtx 4090">RTX 4090</option>
                                        </select>
                                        {custom.gpu === "rtx 3060" ? <p>Starter | Max Graphics at 1080p</p> : null}
                                        {custom.gpu === "rtx 3080" || custom.gpu === "rtx 4070" ? <p>High End | Max Graphics at 1440p</p> : null}
                                        {custom.gpu === "rtx 4080" || custom.gpu === "rtx 4090" ? <p>Extreme | Max Graphics at 4k</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="ram">RAM: </label>
                                        <select name="ram" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="16gb">16gb</option>
                                            <option value="32gb">32gb</option>
                                            <option value="64gb">64gb</option>
                                        </select>
                                        {custom.ram === "16gb" ? <p>Gaming</p> : null}
                                        {custom.ram === "32gb" ? <p>Streaming/Workstation</p> : null}
                                        {custom.ram === "64gb" ? <p>Content Creation</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="storage">SSD: </label>
                                        <select name="storage" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="500gb">500gb</option>
                                            <option value="1tb">1tb</option>
                                            <option value="2tb">2tb</option>
                                            <option value="4tb">4tb</option>
                                        </select>
                                        {custom.storage === "500gb" || custom.storage === "1tb" ? <p>Gaming</p> : null}
                                        {custom.storage === "2tb" ? <p>Streaming/Workstation</p> : null}
                                        {custom.storage === "4tb" ? <p>Content Creation</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="cooling">Cooling: </label>
                                        <select name="cooling" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="air">Air</option>
                                            <option value="liquid">Liquid | Standard</option>
                                            <option value="liquid w/ screen">Liquid | LCD Screen</option>
                                        </select>
                                        {custom.cooling === "air" ? <p>Starter</p> : null}
                                        {custom.cooling === "liquid" ? <p>High End</p> : null}
                                        {custom.cooling === "liquid w/ screen" ? <p>Premium</p> : null}
                                    </div>
                                </div>
                            </> :
                            null
                    }
                    {
                        open.aesthetic === true ? //aesthetic tab body
                            <>
                                <h3 className='caption'>Tell us about you!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="theme">Theme: </label>
                                        <input type="text" name="theme" className='form-input' onChange={changeHandler} />
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="special">Special Requests: </label>
                                        <textarea
                                            type="text"
                                            name="special"
                                            onChange={changeHandler}
                                            cols={'42'}
                                            rows={'10'}
                                            placeholder='I want a motherboard that matches my theme and rgb cables'
                                        />
                                    </div>
                                </div>
                            </> :
                            null
                    }
                    {
                        open.confirm === true ? //confirm tab body
                            <>
                                <h3 className='caption'>Tell us about you!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <button type="submit">Submit Quote</button>
                                    </div>
                                    <div className='form-groups'>
                                        <p>The estimate is subject to change on market</p>
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