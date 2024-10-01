import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { authActions } from "../../app/service/shared/authSlice";
import "../../css/page/login.css";
import { AppDispatch, RootState } from "../../app/service/shared/store";
import { baseUrl } from "../../app/service/shared/baseUrl";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
}

interface googleResponse {
  email: string;
  family_name: string;
  given_name: string;
}
const Login = () => {
  const navigate = useNavigate();
  //GoogleLogin

  const handleGoogleSuccess = (response: any) => {
    const decoded = jwtDecode(response.credential) as googleResponse;
    dispatch(
      authActions.googleLogin({
        email: decoded.email,
        lastName: decoded.family_name,
        firstName: decoded.given_name,
        isAdmin: false,
        password: "google123",
      })
    ).then((resultAction) => {
      if (authActions.googleLogin.fulfilled.match(resultAction)) {
        toast.success(`Welcome ${decoded.given_name}!`);
      } else {
        console.error("Google login failed", resultAction.payload);
      }
    });
  };

  const handleGoogleFailure = (error: any) => {
    console.log(error);
    toast.error("Google login failed, please try again.");
  };
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAdmin, userName, userId, isLoggedIn } = useSelector(
    (state: RootState) => state.authR
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        navigate("/admin/home");
      } else {
        navigate("/home");
      }
    }
  }, [isLoggedIn, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(authActions.login(formData));
      if (authActions.login.fulfilled.match(resultAction)) {
        toast.success(`Welcome ${userName}!`);
      } else {
        console.error("Login failed", resultAction.payload);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error", error);
    }
  };
  const handleGoogleSignIn = () => {
    const returnUrl = encodeURIComponent(window.location.href);
    console.log(returnUrl);
    window.open(
      `https://dorpa.azurewebsites.net/api/v1/auth/signin-google?returnUrl=${returnUrl}`,
      "_self"
    );
  };
  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className='forgot-password'>
            <a href='#'>Forgot password?</a>
          </div>
          <button
            type='submit'
            disabled={isSubmitting || loading}
            className='btn btn-primary btn-block w-100 py-2'
          >
            {loading || isSubmitting ? "Logging in..." : "Login"}
          </button>
          {error && <p className='error-message'>{error}</p>}
        </form>

        <div className='or-signup'>
          <p>Or Sign Up Using</p>
        </div>

        <div className='social-icons'>
          {/* <FaFacebookF className='icon facebook' />
          <FaTwitter className='icon twitter' />
          <FaGoogle className='icon google' onClick={handleGoogleSignIn} /> */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <div className='sign-up'>
          <p>
            Or Sign Up Using <Link to='/register'> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
