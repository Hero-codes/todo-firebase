import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpWithEmailAndPassword = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
            props.setIsAuth(true)
        } catch (error) {
            alert("Email Already In Use")
            console.log(error);
        };
    };

    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
            props.setIsAuth(true)
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="signUpPage">
            <div className="email-password">
                <h2 style={{ marginBottom: "15px" }}>SignUp Page</h2>
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
                <button className='signUp' onClick={signUpWithEmailAndPassword} >Sign Up</button>
                <button className='sign-in-with-google' onClick={signUpWithGoogle}>Sign Up With Google</button>
                <Link to={"/login"}>
                    <p className='already'>Already Have An Account?</p>
                </Link>
            </div>
        </div>
    )
}

export default SignUp;