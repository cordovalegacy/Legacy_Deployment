import { Link } from "react-router-dom";

const Confirmation = () => {

    //change id's to classNames
    //redesign

    return (
        <div className="confirm-container">
            <h3 className="text-amber-700">Thank you for your request.</h3>
            <h4 className="text-purple-500">Hold tight! We will get back to you as soon as we can.</h4>
            <h4 className="text-amber-700">You will receive an automated email if your email address is valid</h4>
            <div className="flex flex-col p-5">
                <Link to='/computers/cart' className="text-purple-400">Process the rest of your orders</Link>
                <Link to='/' className="text-purple-400">Go Home</Link>
            </div>
        </div>
    )
}

export default Confirmation;