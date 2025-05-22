import React, {useState} from "react";
import "./styles.css"
import Login from "./Login"
import { auth, provider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import {useNavigate} from "react-router-dom";


export default function Dashboard_1(){
    const currentDay = new Date().toLocaleDateString("en-US", {weekday: "long"})
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);


    const logout = async () => {
        await signOut(auth);
        navigate("/")
    }

    const register = async () => {
        navigate("/register")
    }

    

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-center">
                    Dashboard
                </h2>

                <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Current Plan:</h2>
                    <button className="text-gray-600">Mess 1</button>
                </div>
                
            </div>


            <div className="text-center text-lg font-medium text-gray-700 mb-6">
                Today is <span>{currentDay}</span>
            </div>

            <div className="max-w-xl mx-auto space-y-2">
                <div
                    className="cursor-pointer p-2 border rounded text-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Breakfast<br></br>
                    7:30AM - 10:00 AM
                </div>

                {isOpen && (
                    <div className="p-2 border rounded bg-gray-100 transition-all duration-300">
                    ...Menu to be updated
                </div>
                )}

            </div>

            <div className="max-w-xl mx-auto space-y-2">
                <div
                    className="cursor-pointer p-2 border rounded text-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Lunch<br></br>
                    12:30PM - 2:45PM
                </div>

                {isOpen && (
                    <div className="p-2 border rounded bg-gray-100 transition-all duration-300">
                    ...Menu to be updated
                </div>
                )}


            </div>

            <div className="max-w-xl mx-auto space-y-2">
                <div
                    className="cursor-pointer p-2 border rounded text-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Snacks<br></br>
                    5:00PM - 6:00PM
                </div>

                {isOpen && (
                    <div className="p-2 border rounded bg-gray-100 transition-all duration-300">
                    ...Menu to be updated
                </div>
                )}


            </div>

            <div className="max-w-xl mx-auto space-y-2">
                <div
                    className="cursor-pointer p-2 border rounded text-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Dinner<br></br>
                    7:30PM - 9:30PM
                </div>

                {isOpen && (
                    <div className="p-2 border rounded bg-gray-100 transition-all duration-300">
                    ...Menu to be updated
                </div>
                )}


            </div>


            <div className="flex justify-center items-center h-screen">
                <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={register}>
                    Unregister?
                </button><br></br>
                <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={logout}>
                    Logout?
                </button>
            </div>


        </>
    )
}