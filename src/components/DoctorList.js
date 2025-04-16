
import React, { useState } from 'react';
import api from '../services/api';
import EditDoctorModal from './EditDoctorModal';
import './DoctorList.css'; // Import the CSS file

const DoctorList = ({ doctors, refreshDoctors }) => {
  const [editDoctor, setEditDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await api.delete(`/api/doctors/${doctorId}`);
        refreshDoctors();
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setShowModal(true);
  };

  return (
    <div className="table-container">
      <h3>Doctor List</h3>
      {showModal && editDoctor && (
        <EditDoctorModal 
          doctor={editDoctor} 
          onClose={() => setShowModal(false)} 
          refreshDoctors={refreshDoctors} 
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Doctor Name</th>
            <th>Specialization</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.doctorId}>
              <td>{doctor.doctorId}</td>
              <td>{doctor.doctorName}</td>
              <td>{doctor.specializationName}</td>
              <td>{doctor.phoneNumber}</td>
              <td>{doctor.address}</td>
              <td>{doctor.email || 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(doctor)}>Edit</button>
                <button onClick={() => handleDelete(doctor.doctorId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
