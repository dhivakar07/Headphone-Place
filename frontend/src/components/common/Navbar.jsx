import { useNavigate } from "react-router-dom";
import auth from "/src/config/firebase.js";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
function Navbar() {
  const navigate = useNavigate();
  const [admin, setadmin] = useState(false);
  const [log, setlog] = useState(false);
  const [popup, setpopup] = useState(false);
  const [sidenav, setsidenav] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (user.uid === "HtKb2vByrgPKwREbWHCnglHzhi42") {
        setadmin(true);
      } else {
        setadmin(false);
      }
    }
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setlog(true);
        console.log(user);
        console.log("User Logged IN");
      } else {
        setlog(false);
        console.log("User Logged OUT");
      }
    });
  }, []);

  const logout = () => {
    signOut(auth);
  };
  return (
    <>
      {/* Navbar */}
      <section className="nav_container">
        <section className="nav_section">
          <div className="nav_header">
            <div className="nav_header-title">
              <img src="/hp-logo.png" alt="logo" />
              <h2>HeadPhone Place</h2>
            </div>
            <div className="product_category">
              <p onClick={() => navigate("/home")}>Home</p>
              <p onClick={() => navigate("/products/IEMs")}>IEMs</p>
              <p onClick={() => navigate("/products/Headphones")}>Headphones</p>
              <p onClick={() => navigate("/products/DACsAndAmps")}>
                DACs and Amps
              </p>
            </div>
          </div>
          <div className="nav_icons">
            {admin && (
              <button
                className="nav_add-prod"
                onClick={() => navigate("/addproduct")}
              >
                Add Product
              </button>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="nav_shop-icon size-6"
              onClick={() => navigate("/cart")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="nav_order-icon size-6"
              onClick={() => navigate("/order")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="nav_profile-icon size-6"
              onClick={() => setpopup(!popup)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="menuicon size-6"
            onClick={() => setsidenav(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </section>
      </section>
      {/* Profile Popup */}
      {popup && (
        <div className="popup_container">
          <div className="popup_box">
            <h1>User Profile</h1>
            <p>Welcome back!</p>
            <div className="popup-btn">
              {log ? (
                <button className="button-style" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button
                  className="button-style"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
              <button className="button-style" onClick={() => setpopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Side Navbar */}
      <section style={{ right: sidenav ? "0" : "-40%" }} className="sidenavbar">
        <div className="close">
          <p onClick={() => setsidenav(false)}>X</p>
        </div>
        <div className="sidenav_icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="nav_order-icon size-6"
            onClick={() => navigate("/order")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="nav_shop-icon size-6"
            onClick={() => navigate("/cart")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="nav_profile-icon size-6"
            onClick={() => setpopup(!popup)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div className="side-navbar__category">
          <p onClick={() => navigate("/home")}>Home</p>
          <p onClick={() => navigate("/products/IEMs")}>IEMs</p>
          <p onClick={() => navigate("/products/Headphones")}>Headphones</p>
          <p onClick={() => navigate("/products/DACsAndAmps")}>DACs and Amps</p>
          {admin && (
            <button
              className="sidenav_add-prod"
              onClick={() => navigate("/addproduct")}
            >
              Add Product
            </button>
          )}
        </div>
      </section>
    </>
  );
}
export default Navbar;
