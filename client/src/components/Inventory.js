import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Inventory1 from '../img/inventory.jpg';
import Inventory2 from '../img/inventory1.jpeg';
import Inventory3 from '../img/inventory2.jpeg';
import Inventory4 from '../img/inventory3.jpeg';
import Inventory5 from '../img/inventory4.jpeg';
import Inventory6 from '../img/inventory5.jpeg';
import { useState } from 'react';

const Inventory = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const product = {
        theme: "Mutant",
        cpu: "Ryzen 5 5600x",
        gpu: "RTX 3050",
        ram: "16gb ddr4 3200mhz",
        storage: "SSD, 500gb m.2 nvme",
        psu: "750w 80+ gold",
        motherboard: "b550M",
        cooling: "Stock (air)",
        case: "mATX case w/ 6 fans",
        accessories: "vertical gpu riser cable",
        price: 950,
        quantity: 1
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/computers/inventory',
                product,
                { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate("/computers/cart");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data.err.errors)
            });
    }
    return (
        <div className="flex flex-col py-40">
            <h2 className="text-center">Check out what we have in stock!</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 my-6">
                <div className="flex flex-col w-full sm:w-96 h-full my-6">
                    <h4 className="text-center">Mid-Tier Gaming Computer</h4>
                    <Carousel
                        className="my-6"
                        infiniteLoop={true}
                        autoFocus={true}
                        transitionTime={800}
                        autoPlay={true}
                        centreMode={true}
                        useKeyboardArrows={true}
                        emulateTouch={true}
                        swipeable={true}
                        labels={false}
                    >
                        <img src={Inventory1} alt="product" />
                        <img src={Inventory2} alt="product" />
                        <img src={Inventory3} alt="product" />
                        <img src={Inventory4} alt="product" />
                        <img src={Inventory5} alt="product" />
                        <img src={Inventory6} alt="product" />
                    </Carousel>
                </div>
                <ul className="flex flex-col w-full sm:w-96 h-full py-6 text-white bg-gradient-to-tr from-stone-200 via-purple-200 to-purple-500 rounded-2xl">
                    <li className="inventory-li">{product.theme}</li>
                    <li className="inventory-li">{product.cpu}</li>
                    <li className="inventory-li">{product.gpu}</li>
                    <li className="inventory-li">{product.ram}</li>
                    <li className="inventory-li">{product.storage}</li>
                    <li className="inventory-li">{product.cooling}</li>
                    <li className="inventory-li">{product.motherboard}</li>
                    <li className="inventory-li">{product.psu}</li>
                    <li className="inventory-li">{product.case}</li>
                    <li className="inventory-li">{product.accessories}</li>
                    {errors.quantity ? (
                        <p className="text-red-500">{errors.quantity.message}</p>
                    ) : (
                        <p className="text-white bg-gradient-to-tr from-stone-300 via-stone-500 to-stone-700 w-1/2 m-auto p-1 rounded-lg text-center">
                            QTY: {product.quantity}
                        </p>
                    )}
                    <h6 className="my-5 text-center text-2xl text-black">${product.price}</h6>
                    <button className="button bg-stone-600 text-white rounded-lg p-2 hover:bg-amber-400 hover:text-white mx-auto">
                        Add to cart
                    </button>
                </ul>
            </div>
            <div className="inventory-container-2">
                <div className="inventory-style-1 bg-amber-400 rounded-2xl p-3 text-stone-800">
                    <h3>Disclosure</h3>
                    <p className="inventory-disclosure-info">All systems come with an inactive version of Windows 10</p>
                    <p className="inventory-disclosure-info">All systems come with Windows OS</p>
                    <p className='inventory-disclosure-info'>Systems come with a 15 day moneyback guarantee IF computer is fully returned with no signs of user damage such as liquclassName damage, cracked parts, or abuse.</p>
                </div>
                <div className='inventory-style-1 bg-purple-500 rounded-2xl p-3 text-stone-800'>
                    <h3 className='inventory-educate'>Not sure what you're looking at?</h3>
                    <p className='inventory-educate-info'>CPU (computer processing unit) is like the brain of the computer. These are important for tasks like streaming, gaming, or content creation.</p>
                    <p className='inventory-educate-info'>GPU (graphics processing unit) is like the brawn of the computer. These are important for tasks like high performance gaming, and vclassNameeo editing.</p>
                </div>
            </div>
        </div>
    )
}


export default Inventory;