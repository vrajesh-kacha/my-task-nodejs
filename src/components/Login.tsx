import React, { useState } from 'react';
import '../css/sb-admin-2.css'; 
import '../vendor/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface UserInfo {
  email: string;
  password: string;
}

interface ErrorState {
  email: string;
  password: string;
}

const Login = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ email: '', password: '' });
  const [error, setError] = useState<ErrorState>({ email: '', password: '' });

  let isFormValid = true;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (!userInfo.email) {
        setError(prevError => ({ ...prevError, email: 'Email is required' }));
        isFormValid = false;
      } else if (!emailRegex.test(userInfo.email)) {
        setError(prevError => ({
          ...prevError,
          email: 'Invalid email format. Please enter a valid email address.'
        }));
        isFormValid = false;
      }

      if (!userInfo.password) {
        setError(prevError => ({ ...prevError, password: 'Password is required' }));
        isFormValid = false;
      }

      if (!isFormValid) {
        return;
      }

      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/login`, userInfo);
      console.log(data);
      if (data) {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err) && err.response) {
        setError({
          email: err.response.data.error?.email || '',
          password: err.response.data.error?.password || ''
        });
      } else {
        setError({
          email: 'An unexpected error occurred.',
          password: ''
        });
      }
    }
  };

  return (
    <div className="bg-gradient-primary" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            onChange={(e) => {
                              setError({ email: '', password: '' });
                              setUserInfo({ ...userInfo, email: e.target.value || '' });
                            }}
                          />
                          {error.email && <span className="text-danger">{error.email}</span>}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            onChange={(e) => {
                              setError({ email: '', password: '' });
                              setUserInfo({ ...userInfo, password: e.target.value || '' });
                            }}
                          />
                          {error.password && <span className="text-danger">{error.password}</span>}
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" htmlFor="customCheck">
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button className="btn btn-primary btn-user btn-block" onClick={handleSubmit}>
                          Login
                        </button>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
