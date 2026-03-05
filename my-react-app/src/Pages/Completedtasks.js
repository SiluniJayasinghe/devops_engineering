import React, { useState, useEffect } from 'react';
import Logo1 from "./Logo1.png";
import Settings from "./settings.png";
import Homenew from "./Homenew.png";
import { MdAddTask, MdCheckCircle } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import "./Completedtasks.css";

export default function Completed() {
    const navigate = useNavigate();
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('tasks');
            const tasks = saved ? JSON.parse(saved) : [];
            setCompletedTasks(tasks.filter(t => t.completed));
        } catch (e) {
            setCompletedTasks([]);
        }
    }, []);

    const refreshCompleted = () => {
        try {
            const saved = localStorage.getItem('tasks');
            const tasks = saved ? JSON.parse(saved) : [];
            setCompletedTasks(tasks.filter(t => t.completed));
        } catch (e) {
            setCompletedTasks([]);
        }
    };

    const handleMarkIncomplete = (id) => {
        try {
            const saved = localStorage.getItem('tasks');
            const tasks = saved ? JSON.parse(saved) : [];
            const updated = tasks.map(t => t.id === id ? { ...t, completed: false } : t);
            localStorage.setItem('tasks', JSON.stringify(updated));
            refreshCompleted();
        } catch (e) {}
    };

    const handleDelete = (id) => {
        try {
            const saved = localStorage.getItem('tasks');
            const tasks = saved ? JSON.parse(saved) : [];
            const updated = tasks.filter(t => t.id !== id);
            localStorage.setItem('tasks', JSON.stringify(updated));
            refreshCompleted();
        } catch (e) {}
    };


    return (
        <div>
            <div className="J103">
                <div className="J203">

                    <div style={{ position: "absolute", width: "1225px", height: "50px" }}>
                        <div style={{ position: "absolute", left: "1062.1px", width: "200px", height: "50px", display: "flex", flexDirection: "row" }}>
                            <div style={{ borderRadius: "50px", width: "40px", height: "40px", backgroundColor: "rgb(14, 10, 70)", margin: "5px 10px 5px 10px" }}></div>
                            <div style={{ borderRadius: "50px", width: "40px", height: "40px", backgroundColor: "rgba(228, 231, 231, 0.781)", margin: "5px 10px 5px 10px" }}></div>
                            <div style={{ borderRadius: "50px", width: "40px", height: "40px", backgroundColor: "rgb(14, 10, 70)", margin: "5px 10px 5px 10px" }}></div>
                        </div>
                    </div>

                    <div style={{ position: "absolute", width: "1227px", height: "50px" }}>
                        <div style={{ position: "absolute", left: "1062.1px", width: "200px", height: "50px", display: "flex", flexDirection: "row" }}>
                            <div className="w03">
                                <img className="D10103" src={Homenew} alt="home" style={{ width: "40px", borderRadius: "40px", cursor: "pointer" }} onClick={() => navigate("/Home")}></img>
                                <span className="q0103" style={{ backgroundColor: "black", fontSize: "14px", fontFamily: "poppins", padding: "5px 10px", borderRadius: "5px", position: "relative", top: "45px", left: "-8px", color:"white" }}>Home</span>
                            </div>
                            <div className="w03">
                                <img className="D20203" src={Settings} alt="cart" style={{ width: "41px", margin: "5px 10px 5px 10px", cursor: "pointer" }} onClick={() => navigate("/Settings")}></img>
                                <span className="q03" style={{ backgroundColor: "black", fontSize: "14px", fontFamily: "poppins", padding: "5px 10px", borderRadius: "5px", position: "relative", top: "45px", left: "-20px", color: "white" }}>Settings</span>
                            </div>
                            <div className="w03">
                                <img className="D30203" src={Logo1} alt="settings" style={{ width: "41px", margin: "5px 10px 5px 10px", cursor: "pointer" }} onClick={() => navigate("/")}></img>
                                <span className="q03" style={{ backgroundColor: "black", fontSize: "14px", fontFamily: "poppins", padding: "5px 10px", borderRadius: "5px", position: "relative", top: "45px", left: "-15px", color: "white" }}>Logout</span>
                            </div>

                        </div>
                    </div>





                    {/* <div className="grp">

                        <div className="tipgrp">

                            <div className="tip" >
                                <img className="B1" alt="img" src={Homenew} style={{ boxShadow: "0px 0px 10px rgb(255, 255, 255)", borderRadius: "40px" }} />

                                <span className="hover" style={{ backgroundColor: "dodgerblue", left: "-12px", fontSize: "14px" }}>Home</span>

                            </div>

                            <div className="tip">
                                <img src={shop} alt="img" className="B2" onclick="document.location='HTML.html'" />
                                <span className="hover" style={{ left: "-17px", fontSize: "14px" }}>Cart</span>

                            </div>

                            <div className="tip" id="id1">
                                <img src={Settings} alt="img" className="B3" onclick="document.location='Settings.html'" />
                                <span className="hover" style={{ left: "-18px", fontSize: "14px" }}>Settings</span>

                            </div>

                            <div className="tip">
                                <img src={Logo1} alt="img" className="B4" onclick="document.location='HTML.html'" />
                                <span className="hover" style={{ left: "-17px", fontSize: "14px" }}>Logout</span>

                            </div>

                        </div>






                    </div> */}

                </div>


                <div className="J303">
                    <div className="container03">

                        <h2 className="J603" style={{ fontFamily: "poppins", textAlign: "center" }}> Hello User</h2>
                        <p style={{ textAlign: "center", marginTop: " 20px", marginBottom: "15px" }}><span id="currentdate"></span></p>
                        <div className="buttonContainer03">
                            <button
                                className="taskButton03"
                                
                                
                            >
                                <MdAddTask className="buttonIcon" />
                                Add task
                            </button>
                            <button className="taskButton" onClick={() => navigate("/Completedtasks")}>
                                <MdCheckCircle className="buttonIcon" />
                                Completed tasks
                            </button>
                        </div>
                        



                    </div>
                    <div className="availablespace03">

                        <div className="Maincontent03">
                            <div className="tasksList">
                                {completedTasks.length === 0 ? (
                                    <p className="noTasksMessage">No completed tasks yet.</p>
                                ) : (
                                    completedTasks.map(task => (
                                        <div key={task.id} className="taskItem completed">
                                            <div className="taskContent">
                                                <h4 className="taskItemTitle">{task.title}</h4>
                                                <p className="taskItemDescription">{task.description}</p>
                                            </div>
                                            <div className="taskActions">
                                                <button className="taskUncompleteBtn" onClick={() => handleMarkIncomplete(task.id)} title="Mark as incomplete">↺</button>
                                                <button className="taskDeleteBtn" onClick={() => handleDelete(task.id)} title="Delete">✕</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>
                    </div>



                </div>




            </div>




        </div >
    )
}
