import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Stars from '../gif/stars.gif';
import Venom from '../img/inventory.jpg';

const Cart = (props) => {

    //clean up
    //fix paypal

    const [inventoryProduct, setInventoryProduct] = useState([])
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    console.log(inventoryProduct);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/computers/inventory')
            .then((res) => {
                console.log(res.data);
                setInventoryProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const removeInventory = (idFromBelow) => {
        console.log('====idFromBelow', idFromBelow)
        axios
            .delete(`http://localhost:8000/api/computers/inventory/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                setInventoryProduct(inventoryProduct.filter((product, index) => product._id !== idFromBelow));
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/users',
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="mt-40 mb-20">
            <h3 className="underline">Your Cart</h3>
            <div className="flex justify-evenly font-bold mt-6">
                <Link to='/computers/customs' className="underline">Custom</Link>
                <Link to='/computers/inventory' className="underline">Inventory</Link>
            </div>
            {inventoryProduct?.length === 0 ?
                <div style={{ backgroundImage: `url(${Stars})` }} className="bg-no-repeat bg-center bg-cover mx-auto w-1/2 h-40">
                    <h3 className="mt-16 font-extrabold">Your cart is <span className="red">empty</span></h3>
                </div> :
                inventoryProduct.map((product, index) => (
                    <div key={index} className="flex w-2/3 mx-auto mt-16 py-6 bg-gradient-to-tr from-stone-400 via-purple-400 to-purple-700 rounded-2xl">
                        <div className="gap-2 text-white flex-1">
                            <h4>Mid-Tier</h4>
                            <img src={Venom} alt='computer-photo' className="w-40 m-auto rounded-xl border border-gray-500 shadow-xl" />
                        </div>
                        <ul className="flex-1">
                            <li className="font-bold">Price: <span>{product.price}</span></li>
                            <li className="font-bold">CPU: {product.cpu}</li>
                            <li className="font-bold">GPU: {product.gpu}</li>
                            <li className="font-bold">RAM: {product.ram}</li>
                            <li className="font-bold">Storage: {product.storage}</li>
                            <li className="font-bold">Cooling: {product.cooling}</li>
                            <div className="flex items-center justify-evenly mt-10">
                                <button onClick={() => navigate(`/computers/order/${product._id}`)} className="hover:!text-green-600 logout-btn">Review Order</button>
                                <button onClick={() => removeInventory(product._id)} className="logout-btn">Remove From Cart</button>
                            </div>
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default Cart;