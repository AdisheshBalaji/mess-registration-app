import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const [registeredMess, setRegisteredMess] = useState(null);
  const navigate = useNavigate();


  const logout = async () => {
      await signOut(auth);
      navigate("/");
  };

  useEffect(() => {
    if (!user) return;


    const fetchRegisteredMess = async () => {
      try {
        const res = await fetch("https://mess-registration-app-production.up.railway.app/api/register/emails");
        const data = await res.json();

        if (data["Mess 1"]?.includes(user.email)) setRegisteredMess("Mess 1");
        else if (data["Mess 2"]?.includes(user.email)) setRegisteredMess("Mess 2");
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
      const res = await fetch("https://mess-registration-app-production.up.railway.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, mess: messName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(data.message);
      setRegisteredMess(messName);
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
      const res = await fetch("https://mess-registration-app-production.up.railway.app/api/register", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, mess: messName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(data.message);
      setRegisteredMess(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Please login to register.</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: 'url("https://adisheshbalaji.github.io/mess-registration-app/iith.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-3xl bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Registration Panel</h1>
        <h2 className="text-xl font-medium text-gray-700">Welcome {user.displayName}</h2>

        <div className="space-y-4 mt-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => handleMessRegister("Mess 1")}
              disabled={loading || registeredMess}
            >
              Register for Mess 1
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => handleUnregister("Mess 1")}
              disabled={loading || registeredMess !== "Mess 1"}
            >
              Unregister from Mess 1
            </button>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => handleMessRegister("Mess 2")}
              disabled={loading || registeredMess}
            >
              Register for Mess 2
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => handleUnregister("Mess 2")}
              disabled={loading || registeredMess !== "Mess 2"}
            >
              Unregister from Mess 2
            </button>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={logout}
            >
              Login Again
            </button>
          </div>
        </div>

        {registeredMess && (
          <p className="text-blue-700 font-medium mt-4">
            You are currently registered in <strong>{registeredMess}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
