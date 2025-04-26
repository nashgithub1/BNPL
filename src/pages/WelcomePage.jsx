import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Import your Button component for consistency
import '../components/styles/welcome.css'; // Import a new CSS file for styling

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/app/'); // Navigate to a registration page
  };

  const handleLogin = () => {
    navigate('/login'); // Navigate to a login page
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Our Service</h1>
      <p className="welcome-subtitle">
        Empowering your financial journey with seamless Buy Now, Pay Later solutions.
      </p>
      <blockquote className="welcome-quote">
        "Financial freedom is available to those who learn about it and work for it." – Robert Kiyosaki
      </blockquote>
      <div className="welcome-buttons">
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
        <Button variant="secondary" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;