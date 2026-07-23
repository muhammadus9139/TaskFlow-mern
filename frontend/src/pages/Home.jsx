import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Home.css";

const initialTasks = [
    { id: 1, text: "Plan the day", done: true },
    { id: 2, text: "Finish the report", done: false },
    { id: 3, text: "Call the client", done: false },
    { id: 4, text: "Review notes", done: true },
];

function Home() {

    const user = localStorage.getItem("user");

    const [tasks, setTasks] = useState(initialTasks);
    const [showAuth, setShowAuth] = useState(false);

    if (user) {
        return <Navigate to="/tasks" replace />;
    }

    const toggleTask = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    return (
        <div className="home-page">

            <section className="hero">
                <div className="hero-copy">
                    <span className="eyebrow">Your day, sorted</span>

                    <h1>
                        Get things done,
                        <br />
                        one check at a time.
                    </h1>

                    <p>
                        A fast, no-clutter to-do list to plan your day,
                        track your progress, and actually finish what you start.
                    </p>

                    <button
                        className="cta-btn"
                        onClick={() => setShowAuth(true)}
                    >
                        Get Started
                    </button>

                    {showAuth && (
                        <div className="auth-choice">
                            <p>How would you like to continue?</p>
                            <div className="auth-buttons">
                                <Link to="/login" className="auth-btn login">
                                    Log In
                                </Link>
                                <Link to="/signup" className="auth-btn signup">
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="hero-demo">
                    <div className="notebook-card">
                        <div className="notebook-header">Today</div>
                        <ul className="task-demo-list">
                            {tasks.map((task) => (
                                <li
                                    key={task.id}
                                    className={task.done ? "done" : ""}
                                    onClick={() => toggleTask(task.id)}
                                >
                                    <span className="checkbox">
                                        {task.done ? "✓" : ""}
                                    </span>
                                    <span className="task-text">{task.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="feature">
                    <span className="feature-check">✓</span>
                    <h3>Add tasks in seconds</h3>
                    <p>No sign-up friction, no clutter — just type and go.</p>
                </div>

                <div className="feature">
                    <span className="feature-check">✓</span>
                    <h3>Track real progress</h3>
                    <p>See what's done and what's pending, at a glance.</p>
                </div>

                <div className="feature">
                    <span className="feature-check">✓</span>
                    <h3>Access anywhere</h3>
                    <p>Your list stays with you, synced across sessions.</p>
                </div>
            </section>

            <footer className="home-footer">
                <p>© {new Date().getFullYear()} TodoList. Built to keep you moving.</p>
            </footer>

        </div>
    );
}

export default Home;