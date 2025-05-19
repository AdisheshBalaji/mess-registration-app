import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleMessRegister = async (messName) => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/register/counts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: auth.currentUser.email,
                mess: messName
            })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            alert(data.message);
        } catch (err) {
            alert(err.message);
        }  finally{
            setLoading(false);
        }
    };




    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Registration Panel</h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome {user?.displayName}
        </h2>
        <div className="flex gap-4 justify-center">
          <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl"
          onClick={() => handleMessRegister("Mess 1")}
          disabled = {loading}>
            Mess 1
          </button>
          <button 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl"
          onClick={() => handleMessRegister("Mess 2")}
          disabled = {loading}>
            Mess 2
          </button>
        
         <button 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl"
          onClick={() => navigate("/admin")}
          disabled = {loading}>
            Check Registration
          </button>


        </div>
      </div>
    </div>
  );


}
