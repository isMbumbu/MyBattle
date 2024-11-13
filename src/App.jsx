import React, { useState } from 'react';
import { RegisterForm, LogInForm } from './Components/AuthForms'; // Adjust the path as needed
import Game from './Components/Game';
import './style.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div className="App">
            <h1>Battleship Game</h1>
            {isLoggedIn ? (
                // Render Game component if the user is logged in
                <Game />
            ) : (
                <div className="authContainer">
                    <div className={`formWrapper ${showLogin ? 'showLogin' : ''}`}>
                        {/* Register Form */}
                        <div className="formContent">
                            <h2>Register</h2>
                            <RegisterForm />
                        </div>
                        {/* Login Form */}
                        <div className="formContent">
                            <h2>Login</h2>
                            <LogInForm onLoginSuccess={handleLoginSuccess} />
                        </div>
                    </div>
                    <div className="toggleContainer">
                        <button onClick={toggleForm} className="toggleButton">
                            {showLogin ? 'Go to Register' : 'Go to Login'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

