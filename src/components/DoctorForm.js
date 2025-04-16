
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './DoctorForm.css'; // Import the CSS file

const DoctorForm = ({ refreshDoctors }) => {
  const [newDoctor, setNewDoctor] = useState({
    doctorName: '',
    specializationId: '',
    email: '',
    address: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await api.get('/api/specializations');
        console.log(response.data); // Debugging
        setSpecializations(response.data);
      } catch (error) {
        console.error('Failed to fetch specializations', error);
      }
    };
    fetchSpecializations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newDoctor.email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await api.post('/api/doctors', {
        doctorName: newDoctor.doctorName,
        specializationId: parseInt(newDoctor.specializationId), // Ensure it's a number
        email: newDoctor.email,
        address: newDoctor.address,
        phoneNumber,
      });
      
      refreshDoctors();
      setNewDoctor({ doctorName: '', specializationId: '', email: '', address: '' });
      setPhoneNumber('');
      setError('');
    } catch (error) {
      console.error('Error adding doctor:', error);
      setError('Failed to add doctor. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Doctor Name" 
        value={newDoctor.doctorName} 
        onChange={(e) => setNewDoctor({ ...newDoctor, doctorName: e.target.value })} 
        required 
      />
      <select 
        value={newDoctor.specializationId} 
        onChange={(e) => setNewDoctor({ ...newDoctor, specializationId: e.target.value })} 
        required
      >
        <option value="">Select Specialization</option>
        {specializations.map((spec, index) => (
          <option key={spec.id ?? index} value={spec.id}>
            {spec.specializationName}
          </option>
        ))}
      </select>
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={newDoctor.email} 
        onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Address" 
        value={newDoctor.address} 
        onChange={(e) => setNewDoctor({ ...newDoctor, address: e.target.value })} 
        required 
      />
      <button type="submit">Add Doctor</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default DoctorForm;
