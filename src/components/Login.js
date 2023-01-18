import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert("Logged in Successfully", "success")
            navigate("/")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-2 d-flex">
            <div className="col-md-6 text-center" style={{ marginTop: '10%' }}>
                <h1 className="text-center" style={{ fontWeight: '600' }}>iNotebook</h1>
                <p className="lh-sm" >iNotebook helps you store notes <br />any time, any where for free.</p>
            </div>
            <div className="col-md-6">
                <h2 className="my-3">Login to use iNotebook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
