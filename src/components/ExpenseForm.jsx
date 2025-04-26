import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import NextButtonIcon from './NextButtonIcon';

function ExpenseForm() {
  const [formData, setFormData] = useState({
    houseRent: '',
    utilityBills: '',
    householdExpenses: '',
    loanRepayment: '',
    other: '',
    totalExpenses: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Calculate total expenses
    const total =
      (parseFloat(updatedFormData.houseRent) || 0) +
      (parseFloat(updatedFormData.utilityBills) || 0) +
      (parseFloat(updatedFormData.householdExpenses) || 0) +
      (parseFloat(updatedFormData.loanRepayment) || 0) +
      (parseFloat(updatedFormData.other) || 0);

    updatedFormData.totalExpenses = total.toString();
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Exclude totalExpenses from validation since it's calculated
    if (
      !formData.houseRent ||
      !formData.utilityBills ||
      !formData.householdExpenses ||
      !formData.loanRepayment ||
      !formData.other
    ) {
      setError('All fields except Total Expenses are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/personal-information', {
        houseRent: formData.houseRent,
        utilityBills: formData.utilityBills,
        householdExpenses: formData.householdExpenses,
        loanRepayment: formData.loanRepayment,
        other: formData.other,
        totalExpenses: formData.totalExpenses,
      });
      console.log('Response:', response.data);
      setSuccess(true);
      setFormData({
        houseRent: '',
        utilityBills: '',
        householdExpenses: '',
        loanRepayment: '',
        other: '',
        totalExpenses: '',
      });
      navigate('/app/contact'); // Navigate to ContactForm after successful submission
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate('/app/nic-upload'); // Navigate back to NICUploadForm
  };

  return (
    <main className="payment-form">
      <h2 className="payment-title">Welcome</h2>
      <h3 className="payment-subtitle">Expense Details</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Form submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">House Rent *</label>
          <input
            type="number"
            name="houseRent"
            value={formData.houseRent}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Utility Bills *</label>
          <input
            type="number"
            name="utilityBills"
            value={formData.utilityBills}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Household Expenses *</label>
          <input
            type="number"
            name="householdExpenses"
            value={formData.householdExpenses}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Loan Repayment *</label>
          <input
            type="number"
            name="loanRepayment"
            value={formData.loanRepayment}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Other Expenses *</label>
          <input
            type="number"
            name="other"
            value={formData.other}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Total Expenses</label>
          <input
            type="number"
            name="totalExpenses"
            value={formData.totalExpenses}
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

export default ExpenseForm;