import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Toast } from "react-toastify/dist/components";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

import { AppDispatch, RootState } from "../../app/service/shared/store";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../app/service/useAggregate/userSlice";
import "../../css/page/login.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector(
    (state: RootState) => state.userR
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const registerData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        isAdmin: false,
      };
      const resultAction = await dispatch(userActions.createUser(registerData));
      if (userActions.createUser.fulfilled.match(resultAction)) {
        navigate("/login");
      } else {
        toast.error(error);
      }
    } catch (error) {
      toast.error("Failed! Please try again");
    }
  };
  return (
    <div className='login-container'>
      <div className='login-box'>
        <ToastContainer />
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-group'>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            disabled={isSubmitting || loading}
            className='btn btn-primary btn-block w-100 py-2'
          >
            {loading || isSubmitting ? "Registering..." : "Register"}
          </button>
          {/* {error && <p className="error-message">{error}</p>} */}
        </form>

        <div className='or-signup'>
          <p>Or Sign Up Using</p>
        </div>

        <div className='social-icons'>
          <FaFacebookF className='icon facebook' />
          <FaTwitter className='icon twitter' />
          <FaGoogle className='icon google' />
        </div>

        <div className='sign-up'>
          <p>
            Already have an account? <Link to='/login'> Login </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
