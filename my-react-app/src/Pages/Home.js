import React, { useState, useEffect } from 'react';
import Logo1 from "./Logo1.png";
import Settings from "./settings.png";
import Homenew from "./Homenew.png";
import { MdAddTask, MdCheckCircle, MdClose, MdEdit } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import "./Home.css";

export default function Home() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            // ignore storage errors
        }
    }, [tasks]);
    const [showModal, setShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleAddTask = () => {
        if (tasks.length >= 4) {
            alert('Maximum 4 tasks allowed!');
            return;
        }
        if (taskTitle.trim() || taskDescription.trim()) {
            const newTask = {
                id: Date.now(),
                title: taskTitle,
                description: taskDescription,
                completed: false
            };
            setTasks([...tasks, newTask]);
            setTaskTitle('');
            setTaskDescription('');
            setShowModal(false);
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleCompleteTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleEditTask = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const handleSaveEdit = () => {
        if (editTitle.trim() || editDescription.trim()) {
            setTasks(tasks.map(task =>
                task.id === editingId 
                    ? { ...task, title: editTitle, description: editDescription }
                    : task
            ));
            setEditingId(null);
            setEditTitle('');
            setEditDescription('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
    };
    return (
        <div>
            <div className="J1">
                <div className="J2">

                    <div style={{ position: "absolute", width: "1225px", height: "50px" }}>
                        <div style={{ position: "absolute", left: "1062.1px", width: "200px", height: "50px", display: "flex", flexDirection: "row" }}>
                            <div style={{ borderRadius: "50px", width: "40px", height: "40px", backgroundColor: "rgb(14, 10, 70)", margin: "5px 10px 5px 10px" }}></div>
                            <div style={{ borderRadius: "50px", width: "40px", height: "40px", backgroundColor: "rgba(228, 231, 231, 0.781)", margin: "5px 10px 5px 10px" }}></div>
                            <div style={{ borderRadius: "50px", width: "40px", height: "40px", backgroundColor: "rgb(14, 10, 70)", margin: "5px 10px 5px 10px" }}></div>
                        </div>
                    </div>

                    <div style={{ position: "absolute", width: "1227px", height: "50px" }}>
                        <div style={{ position: "absolute", left: "1062.1px", width: "200px", height: "50px", display: "flex", flexDirection: "row" }}>
                            <div className="w">
                                <img className="D101" src={Homenew} alt="home" style={{ width: "40px", boxShadow: "0px 0px 10px rgb(255, 255, 255)", borderRadius: "40px", cursor: "pointer" }} onClick={() => navigate("/Home")}></img>
                                <span className="q01" style={{ backgroundColor: "dodgerblue", fontSize: "14px", fontFamily: "poppins", padding: "5px 10px", borderRadius: "5px", position: "relative", top: "0px", left: "-8px" }}>Home</span>
                            </div>
                            <div className="w">
                                <img className="D202" src={Settings} alt="cart" style={{ width: "41px", margin: "5px 10px 5px 10px", cursor: "pointer" }} onClick={() => navigate("/Settings")}></img>
                                <span className="q" style={{ backgroundColor: "black", fontSize: "14px", fontFamily: "poppins", padding: "5px 10px", borderRadius: "5px", position: "relative", top: "45px", left: "-20px", color: "white" }}>Settings</span>
                            </div>
                            <div className="w">
                                <img className="D302" src={Logo1} alt="settings" style={{ width: "41px", margin: "5px 10px 5px 10px", cursor: "pointer" }} onClick={() => navigate("/")}></img>
                                <span className="q" style={{ backgroundColor: "black", fontSize: "14px", fontFamily: "poppins", padding: "5px 10px", borderRadius: "5px", position: "relative", top: "45px", left: "-15px", color: "white" }}>Logout</span>
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


                <div className="J3">
                    <div className="container">

                        <h2 className="J6" style={{ fontFamily: "poppins", textAlign: "center" }}> Hello User</h2>
                        <p style={{ textAlign: "center", marginTop: " 20px", marginBottom: "15px" }}><span id="currentdate"></span></p>
                        <div className="buttonContainer">
                            <button 
                                className="taskButton" 
                                onClick={() => setShowModal(true)}
                                disabled={tasks.length >= 4}
                                style={{ opacity: tasks.length >= 4 ? 0.6 : 1, cursor: tasks.length >= 4 ? 'not-allowed' : 'pointer' }}
                            >
                                <MdAddTask className="buttonIcon" />
                                Add task
                            </button>
                            <button className="taskButton" onClick={() => navigate("/Completedtasks")}>
                                <MdCheckCircle className="buttonIcon" />
                                Completed tasks
                            </button>
                        </div>

                        {showModal && (
                            <div className="modalOverlay">
                                <div className="modal">
                                    <div className="modalHeader">
                                        <h3>Add New Task {tasks.length < 4 ? `(${tasks.length}/4)` : '(4/4 - Limit Reached)'}</h3>
                                        <button className="closeBtn" onClick={() => setShowModal(false)}>
                                            <MdClose />
                                        </button>
                                    </div>
                                    <div className="modalBody">
                                        <input
                                            type="text"
                                            placeholder="Task title"
                                            value={taskTitle}
                                            onChange={(e) => setTaskTitle(e.target.value)}
                                            className="taskInput"
                                        />
                                        <textarea
                                            placeholder="Task description"
                                            value={taskDescription}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                            className="taskTextarea"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                    <div className="modalFooter">
                                        <button className="btnCancel" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button 
                                            className="btnSubmit" 
                                            onClick={handleAddTask}
                                            disabled={tasks.length >= 4}
                                            style={{ opacity: tasks.length >= 4 ? 0.5 : 1, cursor: tasks.length >= 4 ? 'not-allowed' : 'pointer' }}
                                        >
                                            {tasks.length >= 4 ? 'Limit Reached (4/4)' : 'Add Task'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                    <div className="availablespace">
                        <div className="Maincontent">
                            <div className="tasksList">
                                {tasks.length === 0 ? (
                                    <p className="noTasksMessage">No tasks yet. Click "Add task" to create one!</p>
                                ) : (
                                    tasks.map(task => (
                                        <div key={task.id} className={`taskItem ${task.completed ? 'completed' : ''}`}>
                                            <div className="taskContent">
                                                <h4 className="taskItemTitle">{task.title}</h4>
                                                <p className="taskItemDescription">{task.description}</p>
                                            </div>
                                            <div className="taskActions">
                                                <button 
                                                    className="taskEditBtn"
                                                    onClick={() => handleEditTask(task)}
                                                    title="Edit task"
                                                >
                                                    <MdEdit />
                                                </button>
                                                <button 
                                                    className="taskCheckBtn"
                                                    onClick={() => handleCompleteTask(task.id)}
                                                    title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                                                >
                                                    {task.completed ? '✓' : '○'}
                                                </button>
                                                <button 
                                                    className="taskDeleteBtn"
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    title="Delete task"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {editingId && (
                        <div className="modalOverlay">
                            <div className="modal">
                                <div className="modalHeader">
                                    <h3>Edit Task</h3>
                                    <button className="closeBtn" onClick={handleCancelEdit}>
                                        <MdClose />
                                    </button>
                                </div>
                                <div className="modalBody">
                                    <input
                                        type="text"
                                        placeholder="Task title"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="taskInput"
                                    />
                                    <textarea
                                        placeholder="Task description"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="taskTextarea"
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="modalFooter">
                                    <button className="btnCancel" onClick={handleCancelEdit}>Cancel</button>
                                    <button className="btnSubmit" onClick={handleSaveEdit}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>




            </div>




        </div >
    )
}
