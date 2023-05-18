import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Gear from '../img/gear.png';

const Order = () => {

    const { id } = useParams();
    const [orderCheckout, setOrderCheckout] = useState({});
    const shipping = 100;
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/computers/inventory/order/${id}`)
            .then((res) => {
                setOrderCheckout(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/users',
                { withCredentials: true }
            )
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="checkout-container overflow-auto">
            <div className="flex items-center border-b-2 mb-10 mt-20">
                <h2 className="font-bold">Order Details</h2>
                <img id="cart-gear" src={Gear} alt="gear" />
                <div className="flex gap-6">
                    <Link to='/' className="font-bold">Go Back Home</Link>
                    <Link to='/computers/cart' className="font-bold">Back To Cart</Link>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className='flex flex-col w-96 h-full text-amber-200 bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg px-5 py-10'>
                    <h3 className="underline">{user.username}</h3>
                    <h5 className="my-1">CPU: {orderCheckout.cpu}</h5>
                    <h5 className="my-1">GPU: {orderCheckout.gpu}</h5>
                    <h5 className="my-1">RAM: {orderCheckout.ram}</h5>
                    <h5 className="my-1">Storage: {orderCheckout.storage}</h5>
                    <h5 className="my-1">Cooling: {orderCheckout.cooling}</h5>
                    <h5 className="my-1">Power Supply: {orderCheckout.psu}</h5>
                    <h5 className="my-1">Case: {orderCheckout.case}</h5>
                    <h5 className="my-1">Accessories: {orderCheckout.accessories}</h5>
                </div>
                <div className='flex flex-col w-96 h-full text-amber-200 bg-gradient-to-tr from-gray-500 via-gray-700 to-gray-800 rounded-lg px-5 py-10'>
                    <div>
                        <h3 className="underline">Summary</h3>
                        <h5> PC - ${orderCheckout.price}</h5>
                        <h5>Shipping - ${shipping}</h5>
                        <h5>Sales Tax at Checkout</h5>
                    </div>
                    <div className="my-6">
                        <h5>Subtotal: ${orderCheckout.price}</h5>
                        <h5>Grand Total: ${(orderCheckout.price + shipping)}</h5>
                    </div>
                    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: (orderCheckout.price + shipping).toString(),
                                                currency_code: 'USD',
                                                breakdown: {
                                                    item_total: {
                                                        value: orderCheckout.price.toString(),
                                                        currency_code: 'USD',
                                                    },
                                                    shipping: {
                                                        value: shipping.toString(),
                                                        currency_code: 'USD',
                                                    },
                                                },
                                            },
                                            items: [
                                                {
                                                    name: 'Hulk PC',
                                                    quantity: 1,
                                                    unit_amount: {
                                                        value: orderCheckout.price.toString(),
                                                        currency_code: 'USD',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions, e) => {
                                return actions.order.capture().then(function (details) {
                                    //this function will show a transaction success message upon purchase
                                    e.preventDefault();
                                    emailjs.send('service_id', 'contact_form', orderCheckout && user.email, 'LW4RMYIvhRvf0Fz9c')
                                        .then((res) => {
                                            console.log("SUCCESS", res.data);
                                            navigate('/computers/confirmation')
                                        }, (err) => {
                                            console.log(err);
                                        });
                                });
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    )
}

export default Order;