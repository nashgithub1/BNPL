import { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './components/styles/main.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content-wrapper">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Outlet /> {/* This is where PaymentForm, StartForm, etc. will render */}
        </div>
      </div>
    </div>
  );
}

export default App;