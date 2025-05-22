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

        if (email === "adishesh.balaji@gmail.com"){
            alert('Welcome Mr. Adishesh Balaji, admin');
            navigate("/admin");
            return;
        }


      if (!email.endsWith("@iith.ac.in")) {
        alert("Register with IITH Email");
        await auth.signOut();
        setLoading(false);
        return;
      }

      // Fetch registration info from backend
      const res = await fetch(`http://localhost:5000/api/register/emails`);
      if (!res.ok) throw new Error("Failed to fetch registration info");
      const data = await res.json();

      // data example: { "Mess 1": [...emails], "Mess 2": [...emails] }

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center">Mess Registration</h2>

        {/* Email, Password inputs can be removed since you login via popup */}
        {/* Or keep if you plan to use them */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login with IITH Email"}
        </button>
      </form>

      <button
        onClick={() => navigate("/register")}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl"
      >
        Register / Change Mess
      </button>
    </div>
  );
}
