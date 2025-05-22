import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const [registeredMess, setRegisteredMess] = useState(null);  // <-- Add this state
  const navigate = useNavigate();

  // Fetch current registration on mount
  useEffect(() => {
    if (!user) return;

    const fetchRegisteredMess = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/register/emails");
        const data = await res.json();

        // data example: { "Mess 1": [...emails], "Mess 2": [...emails] }
        if (data["Mess 1"].includes(user.email)) setRegisteredMess("Mess 1");
        else if (data["Mess 2"].includes(user.email)) setRegisteredMess("Mess 2");
        else setRegisteredMess(null);
      } catch (err) {
        console.error("Failed to fetch registration status", err);
      }
    };

    fetchRegisteredMess();
  }, [user]);

  const handleMessRegister = async (messName) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          mess: messName,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(data.message);
      setRegisteredMess(messName); // update state on success
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async (messName) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          mess: messName,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(data.message);
      setRegisteredMess(null); // update state on success
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Please login to register.</div>; // handle case if user not logged in

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Registration Panel</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Welcome {user.displayName}</h2>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl"
            onClick={() => handleMessRegister("Mess 1")}
            disabled={loading || registeredMess}
          >
            Mess 1
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl"
            onClick={() => handleUnregister("Mess 1")}
            disabled={loading || registeredMess !== "Mess 1"}
          >
            Unregister from Mess 1
          </button>

          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl"
            onClick={() => handleMessRegister("Mess 2")}
            disabled={loading || registeredMess}
          >
            Mess 2
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl"
            onClick={() => handleUnregister("Mess 2")}
            disabled={loading || registeredMess !== "Mess 2"}
          >
            Unregister from Mess 2
          </button>

          {/* /* <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl"
            onClick={() => navigate("/admin")}
            disabled={loading}
          >
            Check Registration
          </button> */ }
        </div>
      </div>
    </div>
  );
}
