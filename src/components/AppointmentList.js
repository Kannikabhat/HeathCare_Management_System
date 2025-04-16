import React, { useState } from 'react';
import api from '../services/api';
import EditAppointmentModal from './EditAppointmentModal';
import './AppointmentList.css'; // Import the CSS file

const AppointmentList = ({ appointments, refreshAppointments }) => {
  const [editAppointment, setEditAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await api.delete(`/api/appointments/${appointmentId}`);
        refreshAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleEdit = (appointment) => {
    setEditAppointment(appointment);
    setShowModal(true);
  };

  return (
    <div className="table-container">
      <h3>Appointment List</h3>
      {showModal && editAppointment && (
        <EditAppointmentModal 
          appointment={editAppointment} 
          onClose={() => setShowModal(false)} 
          refreshAppointments={refreshAppointments} 
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctorName}</td>
              <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment.appointmentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
