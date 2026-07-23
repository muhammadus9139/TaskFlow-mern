import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskList.css";

function TaskList() {

    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);

    const navigate = useNavigate();

    // ===========================
    // Get All Tasks
    // ===========================

    const getTasks = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    credentials: "include"
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                setTasks(data);

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

        }

    };



    // ===========================
    // Delete Single Task
    // ===========================

    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(

                `http://localhost:5000/api/tasks/${id}`,

                {

                    method: "DELETE",

                    credentials: "include"

                }

            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                // alert("Task Deleted Successfully");

                getTasks();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

        }

    };



    // ===========================
    // Delete Selected Tasks
    // ===========================

    const deleteSelectedTasks = async () => {

        if (selectedTasks.length === 0) {

            alert("Please select tasks");

            return;

        }

        const confirmDelete = window.confirm(
            "Delete selected tasks?"
        );

        if (!confirmDelete) return;

        try {

            const response = await fetch(

                "http://localhost:5000/api/tasks/delete-many",

                {

                    method: "DELETE",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        ids: selectedTasks

                    })

                }

            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                // alert("Selected Tasks Deleted");

                setSelectedTasks([]);

                getTasks();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);

        }

    };



    // ===========================
    // Select One
    // ===========================

    const handleSelect = (id) => {

        if (selectedTasks.includes(id)) {

            setSelectedTasks(

                selectedTasks.filter(

                    taskId => taskId !== id

                )

            );

        } else {

            setSelectedTasks([

                ...selectedTasks,

                id

            ]);

        }

    };



    // ===========================
    // Select All
    // ===========================

    const handleSelectAll = () => {

        if (selectedTasks.length === tasks.length) {

            setSelectedTasks([]);

        } else {

            setSelectedTasks(

                tasks.map(

                    task => task._id

                )

            );

        }

    };



    useEffect(() => {

        getTasks();

    }, []);




    return (

        <div className="task-container">

            <h2>Task List</h2>

            <div className="top-actions">

                <div className="select-all">

                    <input

                        type="checkbox"

                        checked={
                            tasks.length > 0 &&
                            selectedTasks.length === tasks.length
                        }

                        onChange={handleSelectAll}

                    />

                    <span>Select All</span>

                </div>

                <button

                    className="delete-selected-btn"

                    onClick={deleteSelectedTasks}

                >

                    Delete Selected

                </button>

            </div>

            <div className="task-list">

                {

                    tasks.length > 0 ?

                        tasks.map((task) => (

                            <div

                                className="task-card"

                                key={task._id}

                            >

                                <input

                                    className="task-checkbox"

                                    type="checkbox"

                                    checked={
                                        selectedTasks.includes(task._id)
                                    }

                                    onChange={() => handleSelect(task._id)}

                                />

                                <h3>{task.title}</h3>

                                <p>{task.description}</p>

                                <small>ID: {task._id}</small>

                                <div className="btn-group">

                                    <button

                                        className="edit-btn"

                                        onClick={() =>
                                            navigate(`/update-task/${task._id}`)
                                        }

                                    >

                                        Update

                                    </button>

                                    <button

                                        className="delete-btn"

                                        onClick={() =>
                                            deleteTask(task._id)
                                        }

                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        ))

                        :

                        <h3 className="no-task">

                            No Tasks Found

                        </h3>

                }

            </div>

        </div>

    );

}

export default TaskList;