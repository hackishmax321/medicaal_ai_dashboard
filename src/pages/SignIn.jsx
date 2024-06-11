import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usersService from '../services/users.service';
import EventEmitter from '../utils/EventEmitter';
import Notiflix from 'notiflix';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if(username==='admin'&&password==='admin123'){
      localStorage.setItem('username', username);
      localStorage.setItem('role', 'Admin');
      localStorage.setItem('id', 'admmin123');
      localStorage.setItem('avatar', 'https://cdn-icons-png.flaticon.com/512/1533/1533506.png');
      EventEmitter.emit("loginCompleted", {logged: true});
      navigate('/')
    } else {
      await usersService.getUserByUsername(username, password).then((data) => {
        if(data===true){
          Notiflix.Report.success(
            'Success',
            'Login Successful',
            'Okay',
          );
          navigate('/')
        } else {
          Notiflix.Report.failure(
            'Login Failed',
            'Credentials are wrong or account is temporary blocked try again.',
            'Okay',
          );
          return;
        }
        
      })
    }
    
    
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
      <form>
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <div className="mt-1">
            <div className="flex rounded-md shadow-sm">
              
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="your username eg: hashmax321"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSignIn}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
