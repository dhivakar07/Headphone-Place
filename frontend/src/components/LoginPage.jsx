import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signInWithEmailAndPassword(auth, email.trim(), pass.trim())
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          setError("User not Registered. Please signup");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="login_page">
      <div className="login_page-title">
        <img src="/hp-logo.png" alt="logo" />
        <h1>Headphone Place</h1>
      </div>
      <section className="login-container">
        <div className="login-box">
          <header>
            <h1>Login</h1>
          </header>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login_form-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login_form-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            {error && <span className="error-message">{error}</span>}
            <button type="submit" className="login-button">
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
        <footer className="login_footer">
          <p>
            Don't have an account?
            <Link to="/signup" className="login_signup-link">
              Sign up here
            </Link>
          </p>
        </footer>
      </section>
    </section>
  );
}

export default LoginPage;
