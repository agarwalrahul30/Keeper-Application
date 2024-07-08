import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/data"; 

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ website: '', username: '', password: '' });

  useEffect(() => {
    // Replace with your backend API URL
    const fetchData = async () => {
      try {
        const response = await axios.get(backendUrl);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl, newItem);
      setData([...data, response.data]);
      setNewItem({ website: '', username: '', password: '' });
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1>My Login Credentials</h1>
      <table>
        <thead>
          <tr>
            <th>Website</th>
            <th>Username/ID</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.website}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Credential</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Website:
            <input type="text" name="website" value={newItem.website} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Username/ID:
            <input type="text" name="username" value={newItem.username} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" value={newItem.password} onChange={handleInputChange} required />
          </label>
        </div>
        <button type="submit">Add Credential</button>
      </form>
    </div>
  );
}

export default App;
