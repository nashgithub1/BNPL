import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PaymentForm from './components/PaymentForm';
import StartForm from './components/Startform';
import './components/styles/main.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <Header />
      
        <Sidebar />
        <div className="main-content">
          <PaymentForm />
        </div>
      </div>
  );
}

export default App;