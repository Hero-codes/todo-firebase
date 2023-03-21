import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from "./pages/Home"
import { auth } from './firebase'
import { signOut } from "firebase/auth"

function App() {

    const [isAuth, setIsAuth] = React.useState(false);

    const logOutHandler = async () => {
        try {
            await signOut(auth);
            window.location.pathname = "/login";
            setIsAuth(false);
        } catch (err) {
            console.log(err);;
        };
    };

    return (
        <BrowserRouter>
            <nav>
                <Link to="/"> <h1>Todo App</h1> </Link>
                {isAuth && <p style={{ textTransform: "capitalize" }}>{auth.currentUser.email.slice(0, -10)}</p>}
                {isAuth && <button id='logout' onClick={logOutHandler}>LogOut</button>}
                {!isAuth && <Link to={"/login"}>Login</Link>}
                {!isAuth && <Link to={"/signup"}>SignUp</Link>}
            </nav>
            <Routes>
                <Route path='/' element={<Home isAuth={isAuth} />} />
                <Route path='/signup' element={<SignUp setIsAuth={setIsAuth} />} />
                <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App