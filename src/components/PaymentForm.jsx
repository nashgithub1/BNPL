import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import NextButtonIcon from './NextButtonIcon';

function PaymentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nicOrPpNo: '',
    profession: '',
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

    if (!formData.fullName || !formData.dateOfBirth || !formData.nicOrPpNo || !formData.profession) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/api/personal-info', {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        nicOrPpNo: formData.nicOrPpNo,
        profession: formData.profession,
      });
      console.log('Response:', response.data);
      setSuccess(true);
      setFormData({ fullName: '', dateOfBirth: '', nicOrPpNo: '', profession: '' });
      navigate('/app/employment'); // Navigate to EmploymentForm instead of ContactForm
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    }
  };

  return (
    <main className="payment-form">
      <h2 className="payment-title">Welcome</h2>
      <h3 className="payment-subtitle">Personal Details</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Form submitted successfully!</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Name in Full *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">NIC No. / PP No. *</label>
          <input
            type="text"
            name="nicOrPpNo"
            value={formData.nicOrPpNo}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Profession *</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="button-group">
          <Button variant="secondary">Back</Button>
          <Button type="submit" variant="primary">
            Next
            <NextButtonIcon />
          </Button>
        </div>
      </form>
    </main>
  );
}

export default PaymentForm;