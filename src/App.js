import './App.css';
import {LoginPage} from "./MyComponents/LoginPage";
import {Navbar} from "./MyComponents/Navbar";
import {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {LoginRegisterNavbar} from "./MyComponents/LoginRegisterNavbar";
import {HomePage} from "./MyComponents/HomePage";

function App() {
    const [aadhaarNumber, setAadhaarNumber] = useState("")
    const [password, setPassword] = useState("")


    return (
        <>
            <Router>
                <LoginRegisterNavbar/>
                <Routes>
                    <Route exact path="/login"
                           element={<LoginPage aadhaarNumber={aadhaarNumber}
                                               setAadhaarNumber={setAadhaarNumber}
                                               password={password}
                                               setPassword={setPassword}/>}/>
                    <Route exact path="/home" element={<HomePage/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
