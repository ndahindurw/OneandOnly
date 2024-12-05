import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import authService from "../Services/authService";
import Navbar from "../navigationBar/navbar";
import { isExpired, decodeToken } from "react-jwt";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { Table } from "@mui/material";
import axios from "axios";
import { Dialog, DialogContent } from "@mui/material";
import { EmailProvider } from "../Services/EmailProvider";
import { showErrorToast, showSuccessToast } from "../../utils/ToastConfog";

const AuthContext = createContext();

const Signin = () => {
  const [messageTimeout, setMessageTimeout] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [tokenPayLoad, setTokenPayLoad] = useState(authService.getToken());
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(credentials);

      if (response?.data.accessToken) {
        const accessToken = response?.data?.accessToken;

        const payLoad = jwt_decode(accessToken);
        setTokenPayLoad(payLoad);
        const userRole = authService.getUserRole();

        if (payLoad?.authorities === "admin") {
          authService.setToken(accessToken);
          navigate("/Dashboard");
          showSuccessToast(`${userRole} Logged IN Successfully`);
        } else {
          authService.setToken(accessToken);
          navigate("/RequestRom");
          showSuccessToast(`${userRole} Logged IN Successfully`);
        }

        if (payLoad.exp * 1000 < Date.now()) {
          authService.removeToken();
          navigate("/login");
        }
      }

      setError(null);
    } catch (err) {
      console.error("Error during login:", err);
      const errorMessage =
        err.response?.data?.message || "Invalid User Account";
      setError(errorMessage);
      showErrorToast("Verify your Credentials");
      console.log(err);
    }
  };

  const LoginFun = useEffect(() => {
    const token = authService.getToken();
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setTokenPayLoad(decodedToken);
        console.log("Decoded token on app init:", decodedToken);

        if (decodedToken.exp * 1000 < Date.now()) {
          authService.removeToken();
          navigate("/login");
        } else {
          if (decodedToken.authorities === "admin") {
            navigate("/Dashboard");
          } else if (decodedToken.authorities === "user") {
            navigate("/RequestRoom");
          }
        }
      } catch (error) {
        console.error("Error decoding token on app init:", error);
        authService.removeToken();
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    console.log("Closing delete dialog");
    setDeleteDialogOpen(false);
  };

  const sendEmail = () => {
    axios
      .post(`${process.env.REACT_APP_SEND_OTP}/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data) {
          setSuccessMessage("OTP sent successfully");
          setMessageTimeout(setTimeout(() => setSuccessMessage(""), 3000));
        } else {
          throw new Error("Failed to send OTP");
        }
      })
      .catch((error) => {
        setError(error.message); // Or provide more specific error information
      });
  };

  const verifyOTP = () => {
    console.log("Email and otp", email);
    localStorage.setItem("email", email);
    axios
      .post(`${process.env.REACT_APP_VERIFY_OTP}/${otp}/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data) {
          setSuccessMessage("OTP verified successfully");
          setMessageTimeout(setTimeout(() => setSuccessMessage(""), 3000));
          navigate("/ChangePassword");
        } else {
          showErrorToast("Invalid OTP");
        }
      })
      .catch((error) => {
        setError(error.message || "Failed to verify OTP");
      });
  };

  return (
    <EmailProvider email={email}>
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <form className="form-container" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={credentials.email}
              required
              className="input"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={credentials.password}
              required
              className="input"
              onChange={handleChange}
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="green-btn">
              Login
            </button>
            <div className="signup-link" onClick={() => openDeleteDialog()}>
              Forgot Password?
            </div>
          </form>
        </div>

        <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
          <DialogContent style={{ width: "300px" }}>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              Send OTP To This Email
            </div>
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              {error && <p className="error-message">{error.message}</p>}
              <button onClick={() => sendEmail()}>Send Email</button>
            </div>
          </DialogContent>
          <DialogContent>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              Verify OTP
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <input
                type="number"
                className="form-control"
                id="otp"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              {error && <p className="error-message">{error.message}</p>}
              <button onClick={() => verifyOTP()}>Verify OTP</button>
            </div>
          </DialogContent>
        </Dialog>

        {/* {tokenPayLoad && (
          <div>
            <Table tokenPayLoad={setTokenPayLoad} />
          </div>
        )} */}
      </div>
    </EmailProvider>
  );
};

export default Signin;
