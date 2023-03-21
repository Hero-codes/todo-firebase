import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInWithEmailAndPasswordHandler = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            props.setIsAuth(true)
        } catch (error) {
            alert("User not found: Email not registered")
            console.log(error);
        };
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
            props.setIsAuth(true)
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="loginPage">
            <div className="email-password">
                <h2 style={{ marginBottom: "15px" }}>Login Page</h2>
                <input
                    type="email"
                    required
                    placeholder='Type Your Email Here...'
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                <input
                    type="password"
                    required
                    placeholder='Type Your Password Here...'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <footer style={{ margin: "20px 0", textDecoration: "underline" }}>Password should be at least 6 characters</footer>
                <button className='signUp' onClick={signInWithEmailAndPasswordHandler} >Login</button>
                <button className='sign-in-with-google' onClick={signInWithGoogle}>Login With Google</button>
                <Link to={"/signup"}>
                    <p className='already'>Want to create an Account?</p>
                </Link>
            </div>
        </div>
    )
}

export default Login