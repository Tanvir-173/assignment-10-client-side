import React, { useState } from "react";
import { auth } from "../../FireBase/firebase.init";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate("/"); // redirect to homepage
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
            toast.error("User not found!");
            break;
          case "auth/wrong-password":
            toast.error("Wrong password!");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email address!");
            break;
          default:
            toast.error("Login failed!");
        }
      });
  };

  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch(() => toast.error("Google login failed!"));
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow mt-10 bg-white rounded">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          className="w-full h-12 px-3 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <div className="relative">
          <input
            className="w-full h-12 px-3 border rounded"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className="w-full h-12 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2">
          Login
        </button>
      </form>

      <button
        className="w-full h-12 bg-blue-500 text-white rounded hover:bg-blue-600 mt-3"
        onClick={handleGoogle}
      >
        Continue with Google
      </button>

      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
