import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button';
import NextButtonIcon from './NextButtonIcon';

function NICUploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please upload a valid image file (e.g., JPG, PNG).');
        setFile(null);
        setPreview(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file) {
      setError('Please upload an NIC image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nicImage', file);

      const response = await axios.post('http://localhost:8080/api/upload-nic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload Response:', response.data);
      setSuccess(true);
      setFile(null);
      setPreview(null);
      navigate('/app/expenses'); // Navigate to ExpenseForm after successful upload
    } catch (err) {
      setError('Failed to upload the image. Please try again.');
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate('/app/income');
  };

  const handleResetPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    setFile(null);
  };

  return (
    <main className="payment-form">
      <h2 className="payment-title">Welcome</h2>
      <h3 className="payment-subtitle">Upload NIC Image</h3>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Image uploaded successfully!</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Upload NIC Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
            required
          />
        </div>
        {preview && (
          <div className="image-preview">
            <h4>Preview:</h4>
            <img src={preview} alt="NIC Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            <Button variant="secondary" onClick={handleResetPreview}>
              Remove Image
            </Button>
          </div>
        )}
        <div className="button-group">
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="primary">
            Next
            <NextButtonIcon />
          </Button>
        </div>
      </form>
    </main>
  );
}

export default NICUploadForm;