import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Payment(props) {
    const [data, setData] = useState([]);
    const [email, setEmail] = useState()

    let navigate = useNavigate();

    useEffect(() => {
        if (props.sendData && props.sendData.length > 0) {
            setData(props.sendData);
        }
    }, [props.sendData]);

    // Function to calculate the total price for each product
    const calculateTotalPrice = (product) => {
        return product.amount * product.product_price;
    };

    // Calculate the total price for all products
    const totalAmount = data.reduce((total, product) => total + calculateTotalPrice(product), 0);
    const handlePayToConfirm = async () => {
        try {
            // Get the user's email from wherever it is stored in your frontend
            const userEmail = email;  // Replace with actual user email

            // Make a POST request to your Flask backend
            const response = await axios.post('http://localhost:5000/confirm-payment', {
                user_email: userEmail,
                cartData: data,  // Assuming data contains the cart information
                totalAmount: totalAmount,  // Assuming totalAmount is available in your component
            });
            if (response.ok){
                console.log("Payment Confirmed")
                navigate("/EndPage")
            }else {
                console.error("error :", response.data.message)
            }

            // Handle the response as needed
            console.log(response.data.message);  // Log success message or handle accordingly

            // Perform other actions as needed
        } catch (error) {
            console.error('Error confirming order:', error);
            // Handle errors as needed
        }
    };


    return (
        <>
            <div>Payment</div>
            {data.length > 0 ? (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price/Kg</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Total Price</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {data.map((product, index) => (
                        <tr key={index}>
                            <td>{product.product_name}</td>
                            <td>${product.product_price}/Kg</td>
                            <td>{product.amount}Kg</td>
                            <td>${calculateTotalPrice(product)}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="3">Total</td>
                        <td>${totalAmount}</td>
                    </tr>
                    </tfoot>
                </table>
            ) : (
                <p>No products selected for payment.</p>
            )}
            <h5 className='container mx-2'>Please Select the method of Payment</h5>
            <div className="container mx-4 my-3">
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Credit Card
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                       checked/>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Debit Card
                </label>
            </div>
            </div>
            <div className="container">
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">@</span>
                    <input type="text" className="form-control" placeholder="E-Mail" aria-label="Username"
                           aria-describedby="addon-wrapping" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="input-group mb-3 my-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Card Number</span>
                    <input type="text" className="form-control" aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default"/>
                </div>
                <div className="input-group mb-3 my-2">
                    <span className="input-group-text">Security Key</span>
                    <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <span className="input-group-text">CVV</span>
                </div>
                <button type="button" className="btn btn-outline-success" style={{marginBottom:"20px"}} onClick={handlePayToConfirm}>Pay to Confirm</button>
            </div>
        </>
    );
}

Payment.propTypes = {
    sendData: PropTypes.array.isRequired,
};

export default Payment;
