import React from "react";
import pic1 from './pic1.jpg';
// import cut1rbg from './cut1rbg.png';
import todo from './todo.jpg';
import pic2 from './pic2.png';
import pic3 from './pic3.png';
import { useNavigate } from 'react-router-dom';
import './App.css';
//import { useEffect } from "react";
import ring1 from './ring1.png';

function App() {

  const navigate = useNavigate();

  
  
// useEffect(() => {
//   fetch('http://localhost:8081/users')
//     .then[(response) => response.text()]
//     .then[(data) => setMessage(data)]
// },[]);

  return (
    <div className="App" style={{ width: "1252px", height: "574px",  position: "relative", top: "0px", bottom: "0px" }}>
      <div style={{ display: "flex",  width: "790.8px", height: "574px", position: "relative" ,left:"229.7px"}}>


        <img src={pic1} alt="pic1" width="395.3px" height="574px" style={{ position: "absolute", left: "00px", border: "2px solid rgba(174, 78, 212, 1)" }}></img>
        <img src={ring1} alt="cut1rbg" width="105px" height="580px" style={{ position: "absolute", left: "347.3px", top: "-3px" }}></img>
        <div style={{ border: "2px solid rgba(174, 78, 212, 1)", width: "395.3px", height: "574px", position: "absolute", left: "400.3px" }}>
          <div>
            <img src={todo} alt="heading" style={{width:"250px",position:"relative",left:"72.5px",top:"20px"}}></img>
            <div className="button-container" style={{marginLeft:"50.65px"}}>
                <div className="button" style={{ marginTop:"115.195px",backgroundColor: "white", boxShadow: "0px 0px 3px rgba(21, 20, 20, 1)" }}>
                    <div className="icon">
                        <img src={pic2} alt="pic2" className="pic2" height="90px" />
                    </div>
                    <div className="class1">
                        <br />

                        <span style={{fontFamily:"poppins"}}>Login to the App</span>
                        <button className="class2" onClick={() => navigate("/Login")} >Login</button>
                    </div>
                </div>
                <div className="button" style={{ backgroundColor: "white", boxShadow: "0px 0px 3px rgba(21, 20, 20, 1)" }}>
                    <div className="icon">
                        <img src={pic3} alt="pic3" className="pic3" height="90px" />
                    </div>
                    <div className="class1">
                        <br />
                        <span style={{fontFamily:"poppins"}}>Sign Up for the App</span>
                        <button className="class2" onClick={() => navigate("/Signup")} >Sign Up</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
