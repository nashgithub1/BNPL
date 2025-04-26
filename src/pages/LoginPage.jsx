import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button'; // Reuse your Button component
import '../components/styles/welcome.css'; // Reuse the welcome.css for styling

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      // Replace with your actual login API endpoint
      const response = await axios.post('http://localhost:8080/api/login', {
        email: formData.email,
        password: formData.password,
      });
      console.log('Login Response:', response.data);
      setSuccess(true);
      setFormData({ email: '', password: '' });
      navigate('/app'); // Navigate to the main app after successful login
    } catch (err) {
      setError('Failed to login. Please check your credentials and try again.');
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to WelcomePage
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <h2 className="login-subtitle">Sign in to your account</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Login successful! Redirecting...</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="button-group">
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;