import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [counts, setCounts] = useState({ "Mess 1": 0, "Mess 2": 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/register/counts');
        if (!res.ok) throw new Error('Failed to fetch mess counts');
        const data = await res.json();
        setCounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <p>Loading mess counts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Mess Registration Counts</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Object.entries(counts).map(([mess, count]) => (
          <li key={mess} style={{
            background: '#f0f0f0',
            marginBottom: 10,
            padding: 15,
            borderRadius: 5,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <strong>{mess}</strong>: {count} student{count !== 1 ? 's' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
