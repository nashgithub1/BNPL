import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import PaymentForm from './components/PaymentForm';
import EmploymentForm from './components/EmploymentForm';
import IncomeForm from './components/IncomeForm';
import NICUploadForm from './components/NICUploadForm';
import ExpenseForm from './components/ExpenseForm';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Top-level routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Nested routes under /app */}
        <Route path="/app" element={<App />}>
          <Route index element={<PaymentForm />} />
          <Route path="payment" element={<PaymentForm />} />
          <Route path="employment" element={<EmploymentForm />} />
          <Route path="income" element={<IncomeForm />} />
          <Route path="nic-upload" element={<NICUploadForm />} />
          <Route path="expenses" element={<ExpenseForm />} />


        </Route>

        {/* Catch-all route for errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};