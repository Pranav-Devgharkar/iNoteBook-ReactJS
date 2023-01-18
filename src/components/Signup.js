import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("Invalid Details", "danger")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="container mt-2">
            <h2 className="my-3">Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="semail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Comfirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
