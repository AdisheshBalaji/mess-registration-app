import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const Admin = () => {
  const [counts, setCounts] = useState({ "Mess 1": 0, "Mess 2": 0 });
  const [emails, setEmails] = useState({ "Mess 1": [], "Mess 2": [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

    fetchData();
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default Admin;
