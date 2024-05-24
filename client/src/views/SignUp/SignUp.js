import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../SignUp/SignUp.css';
import glogo from "../glogo.png";

function SignUp() {
    const navigate = useNavigate(); 
    const [message, setMessage] = useState('');
    const [formvalue, setFormvalue] = useState({
        username: "",  
        email: "",
        password: "",
        referral: ""   
    });

    const handleInput = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create an order and fetch the order ID
            const orderResponse = await axios.post('http://localhost/growmore/order.php');
            const { id: order_id, amount, currency } = orderResponse.data;

            // Start Razorpay payment
            const options = {
                key: 'rzp_test_yWMvyDcDnYXnV6', // Enter the Key ID generated from the Dashboard
                amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 2000 INR = 200000 paise
                currency: currency,
                name: "GrowMore",
                description: "Registration Payment",
                image: glogo,
                order_id: order_id,
                handler: async function (response) {
                    // Handle payment success
                    const paymentData = {
                        username: formvalue.username,
                        email: formvalue.email,
                        password: formvalue.password,
                        referral: formvalue.referral,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    };

                    // Send payment data to backend to verify and save user
                    const res = await axios.post("http://localhost/growmore/signup.php", paymentData);
                    // setMessage(res.data['message']);
                    if (res.data.success) {
                        localStorage.setItem('user', JSON.stringify(res.data['data']));
                        toast.success('Registration successful!');
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000);
                    } else {
                        toast.error('Registration failed. Please try again.');
                    }
                },
                prefill: {
                    name: formvalue.username,
                    email: formvalue.email,
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error(error);
            toast.error('Payment failed. Please try again.');
        }
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <ToastContainer />
            <div>
                <img src={glogo} alt="" className="grow-logo" />
            </div>
            <div className="row justify-content-center w-100">
                <div className="col-md-6 col-lg-4 bg-light p-3 m-4 shadow-sm rounded-4">
                    <div className="text-center mb-4">
                        <h3 className="font-weight-bold mb-3">Registration</h3>
                        <p className="text-muted w-auto">Welcome! Please enter your details.</p>
                        <h6 className="text-danger">{message}</h6>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input
                                id="username"
                                required
                                name="username"
                                value={formvalue.username}
                                onChange={handleInput}
                                type="text"
                                placeholder="Enter your full name"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                id="email"
                                required
                                name="email"
                                value={formvalue.email}
                                onChange={handleInput}
                                type="email"
                                placeholder="Enter email"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={formvalue.password}
                                onChange={handleInput}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                id="referral"
                                name="referral"
                                placeholder="Referral (optional)"
                                className="form-control"
                                value={formvalue.referral}
                                onChange={handleInput}
                            />
                        </div>

                        <div className="form-check mb-3">
                            <input type="checkbox" id="remember" name="remember" className="form-check-input" required />
                            <label htmlFor="remember" className="form-check-label">
                                I accept the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </label>
                        </div>
                        <div className="d-flex w-100 justify-content-center">
                            <Button type="submit" variant="outline-success" className="w-25 p-1">Pay and Sign Up</Button>{' '}
                        </div>

                        <p className="text-muted text-center w-auto">
                            By creating an account you agree to our <br />
                            <a className="font-weight-bold" href="#">Terms of Service</a> and <a className="font-weight-bold" href="#">Privacy Policy</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
