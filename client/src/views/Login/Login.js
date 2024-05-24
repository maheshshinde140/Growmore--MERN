import axios from 'axios';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../Dashboard/Dashboard.css';
import Admin from '../Admin/Admin';
import { useNavigate } from 'react-router-dom';
import glogo from "../glogo.png";
import '../SignUp/SignUp.css';

const Home = () => {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');
  const [formvalue, setFormvalue] = useState({
    email: "",
    password: "",
    referral: ""   
  });

  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = { email: formvalue.email, password: formvalue.password };
    try {
      const res = await axios.post("http://localhost:5000/api/client/login", formData);
      setMessage(res.data.message);
      if(res.data.token) { 
        localStorage.setItem('token', res.data.token);
        setTimeout(() => {
          navigate('/dashboard');
        }, 900);
      }
    } catch (err) {
      setMessage('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="container main d-flex flex-column justify-content-center align-items-center">
      <div>     
        <img src={glogo} className="grow-logo position-static" alt="logo" />
      </div>
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4 bg-light rounded-5 p-5 shadow">
          <div className="text-center mb-4">
            <h3 className="font-weight-bold mb-3">Login</h3>
            <p className="text-muted w-auto">Welcome! Please enter your details.</p>
            <h6 className="text-danger">{message}</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                id="email"
                required
                name='email'
                value={formvalue.email}
                onChange={handleInput}
                type="email"
                placeholder='Enter email'
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
            <div className="form-check mb-3">
              <input type="checkbox" id="remember" name="remember" className="form-check-input" required />
              <label htmlFor="remember" className="form-check-label">
                I accept the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            <div className='d-flex w-100 justify-content-center'>
              <Button type='submit' variant="outline-success" className='w-25 p-1'>LogIn</Button>
            </div>
            <p className="text-muted text-center w-auto">
              If you are new User <a className="font-weight-bold" href="/signup">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

function Login() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<Admin />} />
    </Routes>
  );
}

export default Login;
