import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Admin = () => {
  const [counts, setCounts] = useState({ "Mess 1": 0, "Mess 2": 0 });
  const [emails, setEmails] = useState({ "Mess 1": [], "Mess 2": [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messes, setMesses] = useState([]);
  const [newLimits, setNewLimits] = useState({});
  const navigate = useNavigate()


  const logout = async () => {
      await signOut(auth);
      navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both counts and emails
        const [countsRes, emailsRes] = await Promise.all([
          fetch('http://localhost:5000/api/register/counts'),
          fetch('http://localhost:5000/api/register/emails')
        ]);

        if (!countsRes.ok) throw new Error('Failed to fetch mess counts');
        if (!emailsRes.ok) throw new Error('Failed to fetch mess emails');

        const [countsData, emailsData] = await Promise.all([
          countsRes.json(),
          emailsRes.json()
        ]);

        setCounts(countsData);
        setEmails(emailsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchMesses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/messes');
        const data = await response.json();
        setMesses(data);
        const initialLimits = data.reduce((acc, mess) => {
          acc[mess._id] = mess.limit;
          return acc;
        }, {});
        setNewLimits(initialLimits);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    fetchMesses();
  }, []);

  const updateLimit = async (messId) => {
    try {
      await fetch(`http://localhost:5000/api/admin/messes/${messId}/limit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newLimit: newLimits[messId] }),
      });
      alert('Limit updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update limit');
    }
  };

  const pieData = {
    labels: messes.map((mess) => mess.mess),
    datasets: [
      {
        data: messes.map((mess) => mess.emails.length),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  if (loading) return <p>Loading mess data...</p>;
  if (error) return <p>Error: {error}</p>;

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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto p-6 bg-white/90 rounded-lg shadow-xl mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Mess Registration Details</h2>
          {Object.entries(counts).map(([mess, count]) => (
            <div key={mess} className="mb-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{mess}</h3>
              <p className="mb-3 text-gray-700">Total Students: {count}</p>
              <div className="space-y-2">
                <h4 className="font-medium">Registered Students:</h4>
                {emails[mess].length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {emails[mess].map((email, index) => (
                      <li key={index} className="text-gray-600">{email}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No students registered</p>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">Mess Limits and Details</h1>
            <Pie data={pieData} className="mb-6" />
            {messes.map((mess) => (
              <div key={mess._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold">{mess.mess}</h2>
                <p className="mb-2">Current Limit: {mess.limit}</p>
                <input
                  type="number"
                  value={newLimits[mess._id] || ''}
                  onChange={(e) => setNewLimits({ ...newLimits, [mess._id]: e.target.value })}
                  className="border rounded-lg p-2 mr-2"
                />
                <button
                  onClick={() => updateLimit(mess._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Update Limit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
