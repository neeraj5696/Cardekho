import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Ensure Firebase is properly configured here
import "../pages/auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("User logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error occurred", error);
      setMessage("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div className="movie-icon">
          <MdMovie />
        </div>
        <div className="input-container">
          <input
            type="text"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button type="submit">Login to your account</button>
        </div>
        <div className="bottom-container">
          <div className="account-message">Don't have an account?</div>
          <div>
            <button
              className="redirect-button"
              onClick={() => navigate("/signup")}
              type="button"
            >
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
