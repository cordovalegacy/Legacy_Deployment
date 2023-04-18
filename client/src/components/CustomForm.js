import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import emailjs from '@emailjs/browser'

const CustomForm = () => {

    const [user, setUser] = useState({}) //inital logged in user state
    const [open, setOpen] = useState({ //inital tab state
        personal: true,
        budget: false,
        performance: false,
        aesthetic: false,
        confirm: false
    })
    const [custom, setCustom] = useState({}) //keeps track of values selected in option tags
    const [price, setPrice] = useState({}) //keeps track of data-price attribute values in option tags
    const [grandTotal, setGrandTotal] = useState(450) //grand total state to tally estimate

    const openHandler = (id) => { //handles left nav tabs opening and closing
        if (id === 'personal') { //personal tab
            setOpen({
                personal: true,
                budget: false,
                performance: false,
                aesthetic: false,
                confirm: false
            })
        }
        else if (id === 'budget') { //budget tab
            setOpen({
                personal: false,
                budget: true,
                performance: false,
                aesthetic: false,
                confirm: false
            })
        }
        else if (id === 'performance') { //performance tab
            setOpen({
                personal: false,
                budget: false,
                performance: true,
                aesthetic: false,
                confirm: false
            })
        }
        else if (id === 'aesthetic') { //aesthetic tab
            setOpen({
                personal: false,
                budget: false,
                performance: false,
                aesthetic: true,
                confirm: false
            })
        }
        else if (id === 'confirm') { //confirm tab
            setOpen({
                personal: false,
                budget: false,
                performance: false,
                aesthetic: false,
                confirm: true
            })
        }
    }

    const changeHandler = (e) => { //watches for activity in each input, uses event object
        console.log("Event: ", e)
        setCustom({ ...custom, [e.target.name]: e.target.value })
        if (e.target.selectedIndex === 1) { //selectedIndex is part of event object
            setPrice({ ...price, [e.target.name]: e.target[1].dataset.price })
        }
        if (e.target.selectedIndex === 2) { //selectedIndex is part of event object
            setPrice({ ...price, [e.target.name]: e.target[2].dataset.price })
        }
        if (e.target.selectedIndex === 3) { //selectedIndex is part of event object
            setPrice({ ...price, [e.target.name]: e.target[3].dataset.price })
        }
        if (e.target.selectedIndex === 4) { //selectedIndex is part of event object
            setPrice({ ...price, [e.target.name]: e.target[4].dataset.price })
        }
        if (e.target.selectedIndex === 5) { //selectedIndex is part of event object
            setPrice({ ...price, [e.target.name]: e.target[5].dataset.price })
        }
    }

    useEffect(() => {
        const { budget, ...theRest } = price //everything in custom state except budget
        const priceValues = Object.values(theRest) //Object.values creates an ARRAY* of each value per key 
        let total = 0
        for (let i = 0; i < priceValues.length; i++) { //iterate through priceValues
            total += parseInt(priceValues[i]) //adds values and parses into nums
        }
        setGrandTotal(total + 450)
    }, [price]) //runs each time we select a new option in performance tab

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        const payload = {
            fullName,
            email,
            phoneNumber,
            budget,
            cpu,
            gpu,
            ram,
            storage,
            cooling,
            theme,
            special,
            grandTotal
        }
        axios
            .post('http://localhost:8000/api/computers/customs',
                payload, // <= this is the object to send required model fields to backend
                { withCredentials: true })
            .then((res) => {
                console.log(res)
                console.log("Posted Custom Order: ", res.data)
                emailjs.send('service_className', 'contact_form', payload, 'LW4RMYIvhRvf0Fz9c')
                    .then((res) => {
                        console.log("Email Sent: ", res.data)
                    })
                    .catch((err) => {
                        console.log("Something went wrong: ", err)
                    })
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
        <form onSubmit={submitHandler} className='custom-form-container-outer'>
            <div className='form-headers'>
                <h2>Let's Build!</h2>
                <div className='form-popups'>
                    {custom.budget ? <h4>Budget: <span className='red'>${custom.budget}</span></h4> : null}
                    {grandTotal < custom.budget ? <h4>Grand Total: <span className='green'>${grandTotal}</span></h4> : <h4>Grand Total: <span className='red'>${grandTotal}</span></h4>}
                </div>
            </div>
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
                                    <label htmlFor="phoneNumber">Phone:</label>
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
                                <h5>Estimate includes $450 to account for the average cost of a case, fans, motherboard, and power supply</h5>
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
                                    </div>
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
                                <h3 className='caption'>What are your performance needs?</h3>
                                <div className='form-groups'>
                                </div>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="cpu">CPU: </label>
                                        <select name="cpu" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="ryzen 5 5600x" data-price="200">Ryzen 5 5600x ($200)</option>
                                            <option value="ryzen 7 5800x" data-price="300">Ryzen 7 5800x ($300)</option>
                                            <option value="ryzen 5 7600x" data-price="300">Ryzen 5 7600x ($300)</option>
                                            <option value="ryzen 7 7700x" data-price="500">Ryzen 7 7700x ($500)</option>
                                            <option value="ryzen 9 7900x" data-price="600">Ryzen 9 7900x ($600)</option>
                                        </select>
                                        {custom.cpu === "ryzen 5 5600x" || custom.cpu === "ryzen 5 7600x" ? <p className='white'>Gaming</p> : null}
                                        {custom.cpu === "ryzen 7 5800x" || custom.cpu === "ryzen 7 7700x" ? <p className='white'>Gaming & Streaming</p> : null}
                                        {custom.cpu === "ryzen 9 7900x" ? <p className='white'>Content Creation</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="gpu">GPU: </label>
                                        <select name="gpu" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="rtx 3060" data-price="300">RTX 3060 ($300)</option>
                                            <option value="rtx 3080" data-price="600">RTX 3080 ($600)</option>
                                            <option value="rtx 4070" data-price="700">RTX 4070 ($700)</option>
                                            <option value="rtx 4080" data-price="1000">RTX 4080 ($1000)</option>
                                            <option value="rtx 4090" data-price="1500">RTX 4090 ($1500)</option>
                                        </select>
                                        {custom.gpu === "rtx 3060" ? <p className='white'>Starter | Max Graphics at 1080p</p> : null}
                                        {custom.gpu === "rtx 3080" || custom.gpu === "rtx 4070" ? <p className='white'>High End | Max Graphics at 1440p</p> : null}
                                        {custom.gpu === "rtx 4080" || custom.gpu === "rtx 4090" ? <p className='white'>Extreme | Max Graphics at 4k</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="ram">RAM: </label>
                                        <select name="ram" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="16gb" data-price="75">16gb ($75)</option>
                                            <option value="32gb" data-price="150">32gb ($150)</option>
                                            <option value="64gb" data-price="250">64gb ($250)</option>
                                        </select>
                                        {custom.ram === "16gb" ? <p className='white'>Gaming</p> : null}
                                        {custom.ram === "32gb" ? <p className='white'>Streaming/Workstation</p> : null}
                                        {custom.ram === "64gb" ? <p className='white'>Content Creation</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="storage">SSD: </label>
                                        <select name="storage" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="500gb" data-price="75">500gb ($75)</option>
                                            <option value="1tb" data-price="125">1tb ($125)</option>
                                            <option value="2tb" data-price="200">2tb ($200)</option>
                                            <option value="4tb" data-price="400">4tb ($400)</option>
                                        </select>
                                        {custom.storage === "500gb" || custom.storage === "1tb" ? <p className='white'>Gaming</p> : null}
                                        {custom.storage === "2tb" ? <p className='white'>Streaming/Workstation</p> : null}
                                        {custom.storage === "4tb" ? <p className='white'>Content Creation</p> : null}
                                    </div>
                                    <div className='form-groups'>
                                        <label htmlFor="cooling">Cooling: </label>
                                        <select name="cooling" onChange={changeHandler}>
                                            <option disabled selected>Select</option>
                                            <option value="air" data-price="50">Air ($50)</option>
                                            <option value="liquid" data-price="150">Liquid | Standard ($150)</option>
                                            <option value="liquid w/ screen" data-price="250">Liquid | LCD Screen ($250)</option>
                                        </select>
                                        {custom.cooling === "air" ? <p className='white'>Starter</p> : null}
                                        {custom.cooling === "liquid" ? <p className='white'>High End</p> : null}
                                        {custom.cooling === "liquid w/ screen" ? <p className='white'>Premium</p> : null}
                                    </div>
                                </div>
                            </> :
                            null
                    }
                    {
                        open.aesthetic === true ? //aesthetic tab body
                            <>
                                <h3 className='caption'>Tell us about your style!</h3>
                                <div className='custom-form-input-container'>
                                    <div className='form-groups'>
                                        <label htmlFor="theme">Theme: </label>
                                        <input type="text" name="theme" className='form-input' onChange={changeHandler} />
                                    </div>
                                    <div className='form-groups-column'>
                                        <label htmlFor="special">Special Requests: </label>
                                        <textarea
                                            type="text"
                                            name="special"
                                            className='form-input'
                                            onChange={changeHandler}
                                            cols={'40'}
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
                                <h3 className='caption'>Quote</h3>
                                <div className='custom-form-input-container'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th scope='col'>CPU</th>
                                                <th scope='col'>GPU</th>
                                                <th scope='col'>RAM</th>
                                                <th scope='col'>SSD</th>
                                                <th scope='col'>COOLING</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{custom.cpu}</td>
                                                <td>{custom.gpu}</td>
                                                <td>{custom.ram}</td>
                                                <td>{custom.storage}</td>
                                                <td>{custom.cooling}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type="submit" className="home-content-button">Submit Quote</button>
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