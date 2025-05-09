import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import NextButtonIcon from './NextButtonIcon';

function EmploymentForm() {
  const [formData, setFormData] = useState({
    natureOfBusiness: '',
    employerName: '',
    designation: '',
    yearsOfExperience: '',
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

    if (!formData.natureOfBusiness || !formData.employerName || !formData.designation || !formData.yearsOfExperience) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/employment-details', {
        natureOfBusiness: formData.natureOfBusiness,
        employerName: formData.employerName,
        designation: formData.designation,
        yearsOfExperience: formData.yearsOfExperience,
      });
      console.log('Response:', response.data);
      setSuccess(true);
      setFormData({ natureOfBusiness: '', employerName: '', designation: '', yearsOfExperience: '' });
      navigate('/app/income'); // Navigate to IncomeForm after successful submission
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate('/app/payment');
  };

  return (
    <main className="payment-form">
      <h2 className="payment-title">Welcome</h2>
      <h3 className="payment-subtitle">Employment Details</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Form submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Nature of Business *</label>
          <input
            type="text"
            name="natureOfBusiness"
            value={formData.natureOfBusiness}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Name of Employer/Business/Enterprise *</label>
          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Designation *</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Experience (Years) *</label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="form-input"
            required
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

export default EmploymentForm;
