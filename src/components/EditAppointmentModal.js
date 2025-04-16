import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EditAppointmentModal = ({ appointment, onClose, refreshAppointments }) => {
  const [updatedAppointment, setUpdatedAppointment] = useState({ ...appointment });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Fetch patients for dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/api/appointments/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Fetch doctors for dropdown
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/api/appointments/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/appointments/${appointment.appointmentId}`, updatedAppointment);
      refreshAppointments(); // Refresh the list after update
      onClose(); // Close the modal
      alert("Appointment updated successfully");
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert("Error updating appointment");
    }
  };

  return (
    <div className="modal">
      <h2>Edit Appointment</h2>
      <form onSubmit={handleUpdate}>
        <label>Patient:</label>
        <select 
          value={updatedAppointment.patientId} 
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, patientId: e.target.value })}
          required
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.patientId} value={patient.patientId}>
              {patient.patientName}
            </option>
          ))}
        </select>

        <label>Doctor:</label>
        <select 
          value={updatedAppointment.doctorId} 
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, doctorId: e.target.value })}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorId} value={doctor.doctorId}>
              {doctor.doctorName}
            </option>
          ))}
        </select>

        <label>Appointment Date:</label>
        <input
          type="datetime-local"
          value={updatedAppointment.appointmentDate}
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, appointmentDate: e.target.value })}
          required
        />

        <label>Status:</label>
        <select 
          value={updatedAppointment.status} 
          onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">Update Appointment</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditAppointmentModal;
