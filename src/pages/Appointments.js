import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AppointmentForm from '../components/AppointmentForm';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/api/appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatientsForDoctor = async (doctorId) => {
    try {
      const response = await api.get(`/api/appointments/patients/${doctorId}`);
      setFilteredPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching patients for doctor:', error);
    }
  };

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    setSelectedDoctor(doctorId);
    fetchPatientsForDoctor(doctorId);
  };

  const renderAppointments = () => {
    if (loading) {
      return <p>Loading appointments...</p>;
    }

    return appointments.length ? (
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.appointmentId}>
            Patient ID: {appointment.patientId}, Doctor ID: {appointment.doctorId}, Date: {appointment.appointmentDate}, Status: {appointment.status}
          </li>
        ))}
      </ul>
    ) : (
      <p>No appointments available.</p>
    );
  };

  return (
    <div>
      <h2>Appointments</h2>
      <AppointmentForm
        refreshAppointments={fetchAppointments}
        patients={patients}
        doctors={doctors}
      />

      {/* <div>
        <label htmlFor="doctorSelect">Select Doctor: </label>
        <select id="doctorSelect" value={selectedDoctor} onChange={handleDoctorChange}>
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorId} value={doctor.doctorId}>
              {doctor.doctorName}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div>
        <h3>Patients for Doctor {selectedDoctor}</h3>
        <ul>
          {filteredPatients.map((patient) => (
            <li key={patient.patientId}>{patient.patientName}</li>
          ))}
        </ul>
      </div> */}

      {renderAppointments()}
    </div>
  );
};

export default Appointments;
