import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Gear from '../img/gear.png';
import Venom from '../img/inventory.jpg';

const Cart = (props) => {

    // const { orderList, setOrderList } = props;
    const { inventoryProduct, setInventoryProduct } = props;
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    // console.log(orderList);
    console.log(inventoryProduct);

    useEffect(() => {
        axios.get('http://localhost:8000/api/computers/inventory')
            .then((res) => {
                console.log(res.data);
                setInventoryProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const removeInventory = (idFromBelow) => {
        console.log('====idFromBelow', idFromBelow)
        axios.delete(`http://localhost:8000/api/computers/inventory/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                setInventoryProduct(inventoryProduct.filter((product, index) => product._id !== idFromBelow));
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/users',
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
        <div className="cart-container">
            <table className="cart-container">
                <div className="cart-header-section">
                    <h3 id="cart-header">Your Cart</h3>
                    <div className="cart-link-spacer">
                        <Link to='/computers/customs'>Custom</Link>
                        <Link to='/computers/inventory'>Inventory</Link>
                    </div>
                    <hr />
                    <br />
                </div>

                {
                    inventoryProduct.map((product, index) => (
                            <div className="cart-card" key={index}>
                                <div className="cart-column">
                                    <div id="cart-center">
                                        <thead id="cart-custom">Mid-Tier</thead>
                                        <img id='inventory-cart-pic' src={Venom} alt='computer-photo' />
                                        <p id="cart-custom">Inventory</p>
                                    </div>
                                    <div>
                                        <button id='cart-btn-remove' onClick={() => removeInventory(product._id)}>Remove From Cart</button>                                    </div>
                                </div>
                                <ul className="cart-column-2">
                                    <li id="cart-list">Price:<span>{product.price}</span></li>
                                    <li id="cart-list">CPU:  {product.cpu}</li>
                                    <li id="cart-list">GPU:  {product.gpu}</li>
                                    <li id="cart-list">RAM:  {product.ram}</li>
                                    <li id="cart-list">Storage:  {product.storage}</li>
                                    <li id="cart-list">Cooling:  {product.cooling}</li>
                                    <br/>
                                    <button id="cart-btn-checkout" onClick={() => navigate(`/computers/order/${product._id}`)}>Review Order</button>
                                </ul>
                            </div>
                    ))}
            </table>
        </div>
    )
}

export default Cart;