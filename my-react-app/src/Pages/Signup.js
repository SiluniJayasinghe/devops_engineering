import React, { useState } from "react";
// import { Button } from "./Button";
// import loginpic from "./loginpic.png";
import "./Signup.css";
// import user from "./user.svg";
// import lock from "./lock.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    
    const navigate = useNavigate();

    // const registerData = { firstname: "",lastname:"", email: "", password: "" };

    const [register,setRegister]=useState({ firstname: "",lastname:"", email: "", password: "" });
    
    // const [istypedfirstname,setistypedfirstname] = useState(true);
    // const [istypedlastname,setistypedlastname] = useState(true);
    // const [istypedemail,setistypedemail] = useState(true);
    // const [istypedpassword,setistypedpassword] = useState(true);

    // const change1 = () =>
    // {
    //     if(register.firstname!==" ")
    //         setistypedfirstname(!istypedfirstname);
    //     alert("FirstName required");


    //     if(register.lastname!==" ")
    //         setistypedlastname(!istypedlastname);
    //     alert("LastName required");

    //     if(register.email!==" ")
    //         setistypedemail(!istypedemail)
    //     alert("Email required")

    //     if(register.password!==" ")
    //         setistypedpassword(!istypedpassword)
    //     alert("Password required")

    //     if(istypedfirstname || istypedlastname || istypedemail || istypedpassword)
    //         alert("Fill all the data");


    // }

   

    const handleChange = (e) => {
    // setRegister({
    //     firstname: document.getElementById("first").value,
    //     lastname: document.getElementById("last").value,
    //     email: document.getElementById("email").value,
    //     password: document.getElementById("password").value
    // })
    setRegister({...register,
        [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(register);
        //  if(firstname===" "||lastname===" "||email===" "||password===" ")
        //     alert("Please fill all the data");

        try{
            const response = await axios.post("http://localhost:8081/addUser", register);
            console.log(response.data);
            alert("Successfully Signed up");
            navigate("/Login");
        }
        catch(error){
            console.log(error);
        }
        
        
    }

            // if(document.getElementById("first").value === "sara")
            // {const input1=document.getElementById('firstname');
            //     input1.style.border="3px solid red";}
        //     input1.focus();}
        //     else if(document.getElementById("lastname").value == "")
        //     {const input2=document.getElementById("firstname");
        //     input2.focus();}
        //     else if(document.getElementById("email").value == "")
        //     {const input3=document.getElementById("firstname");
        //     input3.focus();}
        //     else if(document.getElementById("password").value == "")
        //     {const input4=document.getElementById("firstname");
        //     input4.focus();}

    //     const inputField = document.getElementById('firstname');
    //   inputField.focus();
    

    return (

        

        <div className="A1" >
            <h1 className="A2" style={{ textAlign: "center",fontFamily:"poppins" }}>SignUp</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div  id="firstname" className="A4" ><input id="first" name="firstname" type="text" placeholder="FirstName" value={register.firstname} onChange={handleChange}/></div>

                <div  id="lastname" className="A4"><input id="last" type="text" name="lastname" placeholder="LastName" value={register.lastname} onChange={handleChange}/></div>

                <div  id="email" className="A4"><input id="email" type="text" name="email" placeholder="Email" value={register.email} onChange={handleChange}/></div>

                <div  id="password" className="A4"><input id="password" type="password" name="password" placeholder="Password" value={register.password} onChange={handleChange}/></div>
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button type="submit" className="SignUpbtn"   >SignUp</button>
                </div>
            </form>
        </div>

    );
}
export default Signup;  
