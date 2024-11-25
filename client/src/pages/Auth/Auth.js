import React, { useState } from 'react';


const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div>
            <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
            <form>
                {isSignUp && <input type="text" placeholder="Full Name" />}
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">{isSignUp ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={toggleAuthMode}>
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
};

export default Auth;
