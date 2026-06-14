import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!username.trim()) {
      setError("Name field is empty");
      return;
    }
    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }
    if (pass.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        console.log("User registered successfully");
        navigate("/login");
      })
      .catch((err) => {
        setError("Error registering user: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="signup_page">
      <div className="signup_page-title">
        <img src="/hp-logo.png" alt="logo" />
        <h1>Headphone Place</h1>
      </div>
      <section className="signup-container">
        <div className="signup-box">
          <header>
            <h1>Sign Up</h1>
          </header>
          <form className="signup-form" onSubmit={handleSignup}>
            <div className="signup_form-input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="signup_form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup_form-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            {error && <span className="error-message">{error}</span>}
            <button type="submit" className="signup-button">
              {loading ? "Signing Up.." : "Sign Up"}
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default SignupPage;
