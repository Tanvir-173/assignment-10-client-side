import React, { useState } from "react";
import { auth } from "../../FireBase/firebase.init";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    // Password validation
    if (password !== confirm) return setError("Passwords do not match.");
    if (!/[A-Z]/.test(password))
      return setError("Password must contain an uppercase letter.");
    if (!/[a-z]/.test(password))
      return setError("Password must contain a lowercase letter.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: name, photoURL: photo });
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("Email is already in use!");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email address!");
            break;
          case "auth/weak-password":
            toast.error("Password is too weak!");
            break;
          default:
            toast.error("Registration failed!");
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
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create Account
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-3">
        <input
          className="w-full h-12 px-3 border rounded"
          type="text"
          name="name"
          placeholder="Full Name"
          required
        />
        <input
          className="w-full h-12 px-3 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="w-full h-12 px-3 border rounded"
          type="text"
          name="photo"
          placeholder="Photo URL"
          required
        />
        {/* Password field */}
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

        {/* Confirm password field */}
        <div className="relative">
          <input
            className="w-full h-12 px-3 border rounded"
            type={showConfirm ? "text" : "password"}
            name="confirm"
            placeholder="Confirm Password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>

        <button className="w-full h-12 bg-orange-500 text-white rounded hover:bg-orange-600 mt-2">
          Register
        </button>
      </form>

      <button
        className="w-full h-12 bg-blue-500 text-white rounded hover:bg-blue-600 mt-3"
        onClick={handleGoogle}
      >
        Continue with Google
      </button>

      <p className="mt-3 text-center">
        Already registered?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
