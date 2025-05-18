import React, { useState } from "react"
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import "./styles.css";

export default function LoginPage(){

    const navigate = useNavigate();


    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email;

            if (email.endsWith("@iith.ac.in")){
                alert("Welcome " + result.user.displayName);
                navigate("/dashboard");
            }else{
                alert("Register with IITH Email")
                auth.signOut();
            }
        }catch (error){
            console.error("Login Failed", error)
        }
    }
    
    return (
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center">Mess Registration</h2>

                <div>
                <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                <input className="w-full border border-gray-300 p-2 rounded" 
                type="email" 
                id="email" />
                </div>

                <div>
                <label className="block mb-1 font-medium" htmlFor="password">Password</label>
                <input className="w-full border border-gray-300 p-2 rounded" 
                type="password" 
                id="password" />
                </div>

                <div>
                <label className="block mb-1 font-medium" htmlFor="confirmPassword">Confirm Password</label>
                <input className="w-full border border-gray-300 p-2 rounded" 
                type="password" 
                id="confirmPassword" />
                </div>

                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                onClick = {handleLogin}>
                    Login
                </button>
            </form>
        </div>
        </>
    );

}

