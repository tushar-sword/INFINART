import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // Change if needed

// Function to check server status and get bootTime
const checkServerStatus = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/server-status'); // Endpoint to fetch bootTime
    return res.data.bootTime; // Return the bootTime from server
  } catch (error) {
    throw new Error('Failed to fetch server status');
  }
};

// Register function
const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  const bootTime = Date.now(); // Capture the current boot time
  localStorage.setItem('user', JSON.stringify({ ...res.data, bootTime }));
  return res.data;
};

// Login function
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  const bootTime = Date.now(); // Capture the current boot time
  localStorage.setItem('user', JSON.stringify({ ...res.data, bootTime }));
  return res.data;
};

const authService = { register, login, checkServerStatus };
export default authService;
