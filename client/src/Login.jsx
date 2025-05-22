import React, { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email === "adishesh.balaji@gmail.com") {
        alert("Welcome Mr. Adishesh Balaji, admin");
        navigate("/admin");
        return;
      }

      if (!email.endsWith("@iith.ac.in")) {
        alert("Register with IITH Email");
        await auth.signOut();
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:5000/api/register/emails`);
      if (!res.ok) throw new Error("Failed to fetch registration info");
      const data = await res.json();

      if (data["Mess 1"]?.includes(email)) {
        alert(`Welcome ${result.user.displayName}, you are registered in Mess 1`);
        navigate("/dashboard_1");
      } else if (data["Mess 2"]?.includes(email)) {
        alert(`Welcome ${result.user.displayName}, you are registered in Mess 2`);
        navigate("/dashboard_2");
      } else {
        alert(`Welcome ${result.user.displayName}, you are not registered in any mess`);
        navigate("/register");
      }
    } catch (error) {
      console.error("Login Failed", error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: 'url("/iith.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Mess Registration
        </h2>

        <p className="text-center text-gray-700">
          Login with your IITH email to access your mess dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition 
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
              }`}
          >
            {loading ? "Logging in..." : "Login with IITH Email"}
          </button>
        </form>

        <button
          onClick={() => navigate("/register")}
          className="w-full py-3 mt-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition focus:ring-4 focus:ring-green-300"
        >
          Register / Change Mess
        </button>
      </div>
    </div>
  );
}
