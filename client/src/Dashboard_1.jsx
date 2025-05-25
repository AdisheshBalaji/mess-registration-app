import React, { useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard_1() {
  const navigate = useNavigate();
  const currentDay = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const [openMealIndex, setOpenMealIndex] = useState(null);

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const register = () => {
    navigate("/register");
  };

  const meals = [
    { name: "Breakfast", time: "7:30AM - 10:00AM" },
    { name: "Lunch", time: "12:30PM - 2:45PM" },
    { name: "Snacks", time: "5:00PM - 6:00PM" },
    { name: "Dinner", time: "7:30PM - 9:30PM" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: 'url("/iith.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-3xl bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Dashboard</h2>

        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Current Plan:</h3>
          <span className="text-gray-600">Mess 1</span>
        </div>

        <div className="text-center text-lg font-medium text-gray-700">
          Today is <span className="font-semibold">{currentDay}</span>
        </div>

        {meals.map((meal, index) => (
          <div key={index} className="max-w-xl mx-auto space-y-2">
            <div
              className="cursor-pointer p-3 border rounded text-center bg-white font-semibold text-gray-800 hover:bg-gray-50"
              onClick={() => setOpenMealIndex(openMealIndex === index ? null : index)}
            >
              {meal.name} <br />
              <span className="text-sm font-normal text-gray-600">{meal.time}</span>
            </div>
            {openMealIndex === index && (
              <div className="p-3 border rounded bg-gray-100 text-gray-700 transition-all duration-300">
                ...Menu to be updated
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-center gap-6 pt-6">
          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
            onClick={register}
          >
            Unregister?
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={logout}
          >
            Logout?
          </button>
        </div>
      </div>
    </div>
  );
}
