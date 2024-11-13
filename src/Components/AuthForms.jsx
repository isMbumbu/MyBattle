import React, { useState } from 'react';
import './AuthForms.css';

function RegisterForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate empty fields
        if (!formData.name || !formData.email || !formData.password) {
            setMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("User registered successfully!");
                setFormData({ name: '', email: '', password: '' });
            } else {
                setMessage("Failed to register user.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            setMessage("An error occurred while registering.");
        }
    };

    return (
        <form className="registerForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} /><br/>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} /><br/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} /><br/>

            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
}
function LogInForm({ onLoginSuccess }) {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate empty fields
        if (!formData.name || !formData.password) {
            setMessage('Please fill in both fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/users');
            const users = await response.json();
            const user = users.find(
                (user) => user.name === formData.name && user.password === formData.password
            );

            if (user) {
                setMessage("Login successful!");
                onLoginSuccess();
            } else {
                setMessage("User not found or incorrect password.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage("An error occurred during login.");
        }
    };

    return (
        <form className="logInForm" onSubmit={handleSubmit}>
            <label htmlFor="loginName">Name</label>
            <input type="text" id="loginName" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
            <br />
            <label htmlFor="loginPassword">Password</label>
            <input type="password" id="loginPassword" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
            <br />
            <button type="submit">Log In</button>
            {message && <p>{message}</p>}
        </form>
    );
}
 function AuthForms() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="authContainer">
            <div className={`formWrapper ${showLogin ? 'showLogin' : ''}`}>
                <div className="formContent">
                    <RegisterForm />
                </div>
                <div className="formContent">
                    <LogInForm onLoginSuccess={() => alert("Logged in successfully!")} />
                </div>
            </div>
            <button onClick={() => setShowLogin(!showLogin)} className="toggleButton">
                {showLogin ? 'Go to Register' : 'Go to Login'}
            </button>
        </div>
    );
}
export {RegisterForm,LogInForm,AuthForms}