import React, { useState } from "react";
// import { Button } from "./Button";
// import loginpic from "./loginpic.png";
import "./Login.css";
import user from "./user.svg";
import lock from "./lock.svg";
import pic4 from "./pic4.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {
    const navigate = useNavigate();

    const [password,setPasswordValue]=useState("");
    const [username,setUsernameValue]=useState("");

    const setUsername = (e) => {
        setUsernameValue(e.target.value);
    }

    const setPassword = (e) => {
        setPasswordValue(e.target.value);
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log("This is our data"+username+" "+password);

        
        const data = {
            "username": username,
            "password": password
        }
        try {
            const response = await axios.post("http://localhost:8081/loginUser", data);
            console.log("this is the response"+ response.data);
            if(!response.data){
                alert("Invalid username or password");
            }
            
            else{
                alert("Login successfull");
                navigate("/Home");
            }
            

        }

        catch (error) {
            console.error(error);}
            
    }

    return (

        <div style={{ position:"relative",height: "574px" }}>

            <div style={{position:"absolute",left:"195px",top:"175.795px"}}>
                <img src={pic4} alt="login" className="c1" width="390px" />
            </div>

            <div className="form-box" style={{position:"absolute",top:"125px",left:"670px"}}>
                <h1 style={{ color: "white", fontFamily: "poppins" }}>Login</h1>

                <form onSubmit={handlesubmit}>
                    <div className="input-group" >
                        <div className="input-field" >
                            <img src={user} alt="user" width="20px" className="c2" />
                            <input id="EnteredUsername" type="text" placeholder="Username" onChange={setUsername}/>
                        </div>

                        <div className="input-field" >
                            <img src={lock} alt="lock" width="18px" className="c3" />
                            <input id="EnteredPassword" type="password" placeholder="Password" onChange={setPassword}/>
                        </div>
                        <br />

                    </div>

                    <div>
                        <button type="submit" className="Loginbtn" >Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;  