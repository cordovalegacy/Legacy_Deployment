import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext, useRef } from 'react'
import axios from 'axios'
import './App.css'
import HomePage from './components/Home'
import Gallery from './components/Gallery'
import CustomForm from './components/CustomForm'
import Inventory from './components/Inventory'
import About from './components/About'
import Faq from './components/Faq'
import Cart from './components/Cart'
import Confirmation from './components/Confirmation'
import Profile from './components/Profile'
import Order from './components/Order'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Login from './components/Login'
import Registration from './components/Registration'
import { Data } from './PriceData'
import {
    Chart as ChartJS, //chart won't work without this
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController,
    LineElement,
    PointElement,
    LinearScale,
    Title
} from "chart.js/auto";
import 'chartjs-plugin-datalabels'

ChartJS.register(
    DoughnutController,
    ArcElement,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Legend
)

export const MyContext = createContext()

function App() {

    const [orderList, setOrderList] = useState([])
    const [inventoryProduct, setInventoryProduct] = useState([])

    const [loggedInUser, setLoggedInUser] = useState({})
    const [isOpen, setIsOpen] = useState(false) //toggle state
    const [displayName, setDisplayName] = useState("") //initial nav display name state

    const priceData = {
        labels: ["CPU", "GPU", "RAM", "SSD", "PSU", "Motherboard", "Case", "Cooler",],
        datasets: [
            {
                label: "Avg Price Ratio",
                data: [
                    Data[0].cpu,
                    Data[0].gpu,
                    Data[0].ram,
                    Data[0].ssd,
                    Data[0].power_supply,
                    Data[0].motherboard,
                    Data[0].case,
                    Data[0].cooler
                ],
                backgroundColor:  ["orangered", "crimson", "dodgerblue", "purple", "violet", "royalblue", "rebeccapurple", "blue"],
                borderColor: "black",
                borderWidth: 2,
                hoverOffset: 60
            }
        ]
    }
    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.formattedValue}`;
                    }
                }
            }
        },
    };

    const handleOpen = () => { //toggle function
        setIsOpen(!isOpen)
    }

    const handleClose = () => { //toggle function
        setIsOpen(!isOpen)
    }

    useEffect(() => { //grabs logged in users if there is one
        axios
            .get('http://localhost:8000/api/users', { withCredentials: true }) //get logged in user & checks for authorization
            .then((res) => {
                console.log("Logged in user (App.js)",
                    {
                        ...res.data,
                        password: null //extra precautions so hashed password isn't shared to console
                    })
                setDisplayName(res.data.username) //sets state to logged in user's username so we can set it in the nav
            })
            .catch((err) => {
                console.log("Something went wrong (App.js):", err)
            })
    }, [])



    return (
        <BrowserRouter>
            <MyContext.Provider value={{ loggedInUser, displayName, setDisplayName, handleOpen, handleClose }}>
                <div className="App">
                    <Nav isOpen={isOpen} setLoggedInUser={setLoggedInUser} />
                    <Routes>
                        <Route exact path='/' element={<HomePage />} />
                        <Route path='/computers/order/:id' element={<Order />} />
                        <Route path='/computers/profile/:username' element={<Profile />} />
                        <Route path='/computers/login' element={<Login setLoggedInUser={setLoggedInUser} />} />
                        <Route path='/computers/registration' element={<Registration />} />
                        <Route path='/computers/gallery' element={<Gallery />} />
                        <Route path='/computers/customs' element={<CustomForm orderList={orderList} setOrderList={setOrderList} PriceData={priceData} options={options} />} />
                        <Route path='/computers/inventory' element={<Inventory inventoryProduct={inventoryProduct} setInventoryProduct={setInventoryProduct} />} />
                        <Route path='/computers/about' element={<About />} />
                        <Route path='/computers/faq' element={<Faq />} />
                        <Route path='/computers/cart' element={<Cart />} />
                        <Route path='/computers/confirmation' element={<Confirmation />} />
                    </Routes>
                    <Footer />
                </div>
            </MyContext.Provider>
        </BrowserRouter>
    )
}

export default App