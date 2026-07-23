import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Save User Data
                localStorage.setItem("user", JSON.stringify(data.user));

                // alert("Login Successful");

                setEmail("");
                setPassword("");

                navigate("/");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            alert("Server Error");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <Link to="/" className="back-link">← Back to Home</Link>
                <span className="auth-eyebrow">Welcome back</span>
                <h2>Log in to your list</h2>
                <p>Pick up right where you left off.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Log In</button>
                </form>

                <div className="signup-link">
                    Don't have an account?
                    <Link to="/signup"> Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;