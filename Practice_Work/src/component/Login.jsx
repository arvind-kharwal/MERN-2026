import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    return (
        <div>   
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg" style={{ width: '600px' }}>
        <div className="card-body">
        <h2 className="card-title text-center mb-4">Login</h2>
        <form>
            <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
            />
            </div>

            <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
            />
            </div>

            <div className="form-check mb-3">
            <input 
                type="checkbox" 
                className="form-check-input" 
                id="exampleCheck1" 
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
                Remember me
            </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
            Login
            </button>
        </form>
        </div>
    </div>
    </div>
        </div>
);
}
