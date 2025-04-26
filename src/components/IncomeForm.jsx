import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import NextButtonIcon from './NextButtonIcon';

function IncomeForm() {
  const [formData, setFormData] = useState({
    basicSalary: '',
    allowance: '',
    profitsDividends: '',
    otherIncome: '',
    totalIncome: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Calculate total income
    const total =
      (parseFloat(updatedFormData.basicSalary) || 0) +
      (parseFloat(updatedFormData.allowance) || 0) +
      (parseFloat(updatedFormData.profitsDividends) || 0) +
      (parseFloat(updatedFormData.otherIncome) || 0);

    updatedFormData.totalIncome = total.toString();
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Exclude totalIncome from validation since it's calculated
    if (
      !formData.basicSalary ||
      !formData.allowance ||
      !formData.profitsDividends ||
      !formData.otherIncome
    ) {
      setError('All fields except Total Income are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/personal-information', {
        basicSalary: formData.basicSalary,
        allowance: formData.allowance,
        profitsDividends: formData.profitsDividends,
        otherIncome: formData.otherIncome,
        totalIncome: formData.totalIncome,
      });
      console.log('Response:', response.data);
      setSuccess(true);
      setFormData({
        basicSalary: '',
        allowance: '',
        profitsDividends: '',
        otherIncome: '',
        totalIncome: '',
      });
      navigate('/app/nic-upload'); // Navigate to NICUploadForm after successful submission
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate('/app/employment');
  };

  return (
    <main className="payment-form">
      <h2 className="payment-title">Welcome</h2>
      <h3 className="payment-subtitle">Income Details</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Form submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Basic Salary *</label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Allowance *</label>
          <input
            type="number"
            name="allowance"
            value={formData.allowance}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Profits/Dividends *</label>
          <input
            type="number"
            name="profitsDividends"
            value={formData.profitsDividends}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Other Income *</label>
          <input
            type="number"
            name="otherIncome"
            value={formData.otherIncome}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Total Income</label>
          <input
            type="number"
            name="totalIncome"
            value={formData.totalIncome}
            className="form-input"
            readOnly // Make the field read-only since it's calculated
          />
        </div>
        <div className="button-group">
          <Button variant="secondary" onClick={handleBack}>Back</Button>
          <Button type="submit" variant="primary">
            Next
            <NextButtonIcon />
          </Button>
        </div>
      </form>
    </main>
  );
}

export default IncomeForm;