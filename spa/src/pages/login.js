import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { email, password };
    try {
      const res = await axios.post('/api/login', values);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/protected';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;