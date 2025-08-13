import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL || "http://localhost:5173";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get(`${API_BASE}/api/v1/user/patient/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message || err?.message || "Request failed";
        toast.error(msg);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/IITJ_COLOURED.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setShow(false)}
              className="admin-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Admin
            </a>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin} style={{ cursor: 'pointer' }}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
