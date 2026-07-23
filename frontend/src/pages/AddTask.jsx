import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

function AddTask() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const addTask = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title,
                        description
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                // alert("Task Added Successfully");

                navigate("/tasks");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log("Error:", error);

            alert("Server Error");

        }

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        addTask();

        setTitle("");
        setDescription("");

    };

    return (

        <div className="add-task-container">

            <h2>Add New Task</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">
                    Add Task
                </button>

            </form>

        </div>

    );

}

export default AddTask;