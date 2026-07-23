import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ name, email, password })
                }
            );

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Store JWT Token in Cookie
                if (data.token) {
                    document.cookie = `token=${data.token}; max-age=604800; path=/`;
                }

                alert("Signup Successful");

                setName("");
                setEmail("");
                setPassword("");

                // Go Login Page
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            alert("Server Error");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <Link to="/" className="back-link">← Back to Home</Link>
                <span className="auth-eyebrow">Get started</span>
                <h2>Create your account</h2>
                <p>Start planning your day in seconds.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    <button type="submit">Sign Up</button>
                </form>

                <div className="login-link">
                    Already have an account?
                    <Link to="/login"> Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;