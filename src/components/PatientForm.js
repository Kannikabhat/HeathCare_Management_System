// PatientForm.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './PatientForm.css'; // Import your CSS file

const PatientForm = ({ refreshPatients }) => {
  const [newPatient, setNewPatient] = useState({
    patientName: '',
    email: '',
    address: '',
    age: '',
  });
  const [phoneNumber, setPhoneNumber] = useState(''); // Separate state for phone number
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newPatient.email)) {
      setError('Invalid email format');
      return;
    }

    if (isNaN(newPatient.age) || newPatient.age <= 0) {
      setError('Age must be a valid positive number');
      return;
    }

    try {
      // Create a patient with contact details separately
      const response = await api.post('/api/patients', {
        ...newPatient,
        phoneNumber, // Include phoneNumber for API logic
      });
      refreshPatients();
      setNewPatient({ patientName: '', email: '', address: '', age: '' });
      setPhoneNumber(''); // Reset phone number
      setError('');
    } catch (error) {
      console.error('Error adding patient:', error);
      setError('Failed to add patient. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Patient Name" 
        value={newPatient.patientName} 
        onChange={(e) => setNewPatient({ ...newPatient, patientName: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Phone Number" 
        value={phoneNumber} // Bind phone number state
        onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number state
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={newPatient.email} 
        onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        placeholder="Address" 
        value={newPatient.address} 
        onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })} 
        required 
      />
      <input 
        type="number" 
        placeholder="Age" 
        value={newPatient.age} 
        onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} 
        required 
      />
      <button type="submit">Add Patient</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PatientForm;

// // PatientForm.js
// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import './PatientForm.css'; // Import your CSS file

// const PatientForm = ({ refreshPatients }) => {
//   const [newPatient, setNewPatient] = useState({
//     patientName: '', // camelCase
//     email: '',
//     address: '',
//     age: '',
//   });
//   const [phoneNumber, setPhoneNumber] = useState(''); // camelCase for phoneNumber
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(newPatient.email)) {
//       setError('Invalid email format');
//       return;
//     }

//     if (isNaN(newPatient.age) || newPatient.age <= 0) {
//       setError('Age must be a valid positive number');
//       return;
//     }

//     try {
//       // Create a patient with contact details separately
//       const response = await api.post('/api/patients', {
//         ...newPatient,
//         phoneNumber, // Include phoneNumber for API logic
//       });
//       refreshPatients();
//       setNewPatient({ patientName: '', email: '', address: '', age: '' });
//       setPhoneNumber(''); // Reset phone number
//       setError('');
//     } catch (error) {
//       console.error('Error adding patient:', error);
//       setError('Failed to add patient. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text" 
//         placeholder="Patient Name" 
//         value={newPatient.patientName} // camelCase for patientName
//         onChange={(e) => setNewPatient({ ...newPatient, patientName: e.target.value })} // camelCase
//         required 
//       />
//       <input 
//         type="text" 
//         placeholder="Phone Number" 
//         value={phoneNumber} // camelCase for phoneNumber
//         onChange={(e) => setPhoneNumber(e.target.value)} // Update phoneNumber state
//         required 
//       />
//       <input 
//         type="email" 
//         placeholder="Email" 
//         value={newPatient.email} 
//         onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
//         required 
//       />
//       <input 
//         type="text" 
//         placeholder="Address" 
//         value={newPatient.address} 
//         onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })} 
//         required 
//       />
//       <input 
//         type="number" 
//         placeholder="Age" 
//         value={newPatient.age} 
//         onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} 
//         required 
//       />
//       <button type="submit">Add Patient</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default PatientForm;

