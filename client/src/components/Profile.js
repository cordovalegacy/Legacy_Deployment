import { useState, useEffect } from "react";
import axios from 'axios';

const Profile = () => {

    //cleanup
    //implement

    const [user, setUser] = useState({});
    const [orders, setOrders] = useState({});
    const [quotes, setQuotes] = useState({});
    const [isOpenAccount, setIsOpenAccount] = useState(true);
    const [isOpenQuotes, setIsOpenQuotes] = useState(false);
    const [isOpenOrders, setIsOpenOrders] = useState(false);

    const handleOpenAccount = () => {
        setIsOpenAccount(!isOpenAccount)
        setIsOpenQuotes(null)
        setIsOpenOrders(null)
    }

    const handleOpenQuotes = () => {
        setIsOpenQuotes(!isOpenQuotes)
        setIsOpenAccount(null)
        setIsOpenOrders(null)
    }

    const handleOpenOrders = () => {
        setIsOpenOrders(!isOpenOrders)
        setIsOpenAccount(null)
        setIsOpenQuotes(null)
    }

    useEffect(() => {
        const fetchComputers = async () => {
            const res = await axios.get(`http://localhost:8000/api/computersbyuser/${user.email}`,
                { withCredentials: true })
            console.log(res.data);
            setOrders(res.data);
        }
        fetchComputers();
    }, []);

    useEffect(() => {
        const fetchCustoms = async () => {
            const res = await axios.get(`http://localhost:8000/api/customsbyuser/${user.email}`,
                { withCredentials: true })
            console.log(res.data);
            setQuotes(res.data);
        }
        fetchCustoms();
    }, []);


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
        <div className="checkout-container">
            {user.username ?
                <h2 id="profile-header">{user.username}'s Profile</h2>
                : null}
            <div className="profile-content-container">
                <ul className="profile-details-container">
                    <li><button className="profile-details-btn" onClick={handleOpenAccount}>Account Details</button></li>
                    <li><button className="profile-details-btn" onClick={handleOpenQuotes}>Quotes</button></li>
                    <li><button className="profile-details-btn" onClick={handleOpenOrders}>Orders</button></li>
                </ul>
                <div className="account-content-container">
                    {isOpenAccount ? (
                        <ul className="account-content-wrapper">
                            <h3>Your Information</h3>
                            <li className="account-content">Username: {user.username}</li>
                            <li className="account-content">Created on: {user.createdAt}</li>
                            <li className="account-content">Email: {user.email}</li>
                        </ul>
                    ) : null}
                    {isOpenQuotes ? (
                        <ul className="account-content-wrapper">
                            <h3>Your Quotes</h3>
                            <li className="account-content">Nothing to display</li>
                        </ul>
                    ) : null}
                    {isOpenOrders ? (
                        <ul className="account-content-wrapper">
                            <h3>Your Orders</h3>
                            <li className="account-content">Nothing to display</li>
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Profile;