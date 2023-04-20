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

const Inventory = () => {

    //clean up code
    //redesign overhaul

    const navigate = useNavigate();

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
        price: "950",
        quantity: "1"
    }

    function denied() {
        alert("Please register an account with us and log in to add products to cart.");
        navigate("/computers/logreg");
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
                denied();
            });
    }
    return (
        <div className='flex flex-col py-40'>
            <h2>Check out what we have in stock!</h2>
            <div className='flex justify-center items-center gap-16 my-6'>
                <div className='flex-col flex w-96 h-full my-6'>
                    <h4>Mid-Tier Gaming Computer</h4>
                    <Carousel
                        className='my-6'
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
                <ul className='flex flex-col w-96 h-full py-6 text-amber-200 bg-amber-400 rounded-2xl'>
                    <li className='text-stone-900'>{product.theme}</li>
                    <li className='text-stone-900'>{product.cpu}</li>
                    <li className='text-stone-900'>{product.gpu}</li>
                    <li className='text-stone-900'>{product.ram}</li>
                    <li className='text-stone-900'>{product.storage}</li>
                    <li className='text-stone-900'>{product.cooling}</li>
                    <li className='text-stone-900'>{product.motherboard}</li>
                    <li className='text-stone-900'>{product.psu}</li>
                    <li className='text-stone-900'>{product.case}</li>
                    <li className='text-stone-900'>{product.accessories}</li>
                    <p className='text-red-500 bg-stone-700 w-1/2 m-auto p-1 rounded-lg'>qty: {product.quantity}</p>
                    <h5 className='my-5 text-stone-800 text-2xl'>${product.price} <button className='button bg-stone-600 text-white rounded-lg p-2' onClick={submitHandler}>Add to cart</button></h5>
                </ul>
            </div>
            <div className='inventory-container-2'>
                <div className='inventory-style-1 bg-amber-400 rounded-2xl p-3 text-stone-800'>
                    <h3>Disclosure</h3>
                    <p className='inventory-disclosure-info'>All systems come with an inactive version of Windows 10</p>
                    <p className='inventory-disclosure-info'>All systems come with Windows OS</p>
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