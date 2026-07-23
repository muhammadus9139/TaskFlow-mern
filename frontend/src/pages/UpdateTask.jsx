import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddTask.css";

function UpdateTask() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    // ===========================
    // Get Single Task
    // ===========================

    const getTask = async () => {

        try {

            const response = await fetch(

                `http://localhost:5000/api/tasks/${id}`,

                {

                    credentials: "include"

                }

            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                setTitle(data.title);
                setDescription(data.description);

            } else {

                alert(data.message);

                navigate("/tasks");

            }

        }
        catch (error) {

            console.log(error);

            alert("Server Error");

        }

    };



    // ===========================
    // Update Task
    // ===========================

    const updateTask = async () => {

        try {

            const response = await fetch(

                `http://localhost:5000/api/tasks/${id}`,

                {

                    method: "PUT",

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

                alert("Task Updated Successfully");

                navigate("/tasks");

            } else {

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

            alert("Server Error");

        }

    };



    // ===========================
    // Form Submit
    // ===========================

    const handleSubmit = (e) => {

        e.preventDefault();

        updateTask();

    };



    useEffect(() => {

        getTask();

    }, [id]);



    return (

        <div className="add-task-container">

            <h2>Update Task</h2>

            <form onSubmit={handleSubmit}>

                <input

                    type="text"

                    value={title}

                    onChange={(e) => setTitle(e.target.value)}

                />

                <textarea

                    value={description}

                    onChange={(e) => setDescription(e.target.value)}

                />

                <button type="submit">

                    Update Task

                </button>

            </form>

        </div>

    );

}

export default UpdateTask;