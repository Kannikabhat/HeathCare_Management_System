// // import React, { useState, useEffect } from 'react';
// // import api from '../services/api';
// // import './MedicalRecordsPage.css';

// // const MedicalRecordsPage = () => {
// //   const [medicalRecords, setMedicalRecords] = useState([]);
// //   const [patients, setPatients] = useState([]);
// //   const [doctors, setDoctors] = useState([]);
// //   const [newRecord, setNewRecord] = useState({
// //     patientId: '',
// //     doctorId: '',
// //     diagnosis: '',
// //     treatment: '',
// //     prescription: '',
// //     recordDate: ''
// //   });
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     // Fetch existing medical records
// //     const fetchMedicalRecords = async () => {
// //       try {
// //         const response = await api.get('/api/medical-records');
// //         setMedicalRecords(response.data);
// //       } catch (error) {
// //         console.error('Error fetching medical records:', error);
// //       }
// //     };

// //     // Fetch patients and doctors for dropdowns
// //     const fetchDropdownData = async () => {
// //       try {
// //         const patientsResponse = await api.get('/api/appointments/patients');
// //         const doctorsResponse = await api.get('/api/appointments/doctors');
// //         setPatients(patientsResponse.data);
// //         setDoctors(doctorsResponse.data);
// //       } catch (error) {
// //         console.error('Error fetching patients or doctors:', error);
// //       }
// //     };

// //     fetchMedicalRecords();
// //     fetchDropdownData();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!newRecord.patientId || !newRecord.doctorId || !newRecord.diagnosis) {
// //       setError('All fields are required.');
// //       return;
// //     }
    
// //     try {
// //       await api.post('/api/medical-records', newRecord);
// //       setError('');
// //       setNewRecord({
// //         patientId: '',
// //         doctorId: '',
// //         diagnosis: '',
// //         treatment: '',
// //         prescription: '',
// //         recordDate: ''
// //       });
// //       setMedicalRecords([...medicalRecords, newRecord]); // Update the records list
// //     } catch (error) {
// //       setError('Error creating medical record.');
// //     }
// //   };

// //   return (
// //     <div className="medical-records-page">
// //       <h3>Medical Records</h3>

// //       <form onSubmit={handleSubmit}>
// //         <h4>Create New Record</h4>
// //         <label>Patient:</label>
// //         <select
// //           value={newRecord.patientId}
// //           onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
// //         >
// //           <option value="">Select Patient</option>
// //           {patients.map((patient) => (
// //             <option key={patient.patientId} value={patient.patientId}>
// //               {patient.patientName}
// //             </option>
// //           ))}
// //         </select>

// //         <label>Doctor:</label>
// //         <select
// //           value={newRecord.doctorId}
// //           onChange={(e) => setNewRecord({ ...newRecord, doctorId: e.target.value })}
// //         >
// //           <option value="">Select Doctor</option>
// //           {doctors.map((doctor) => (
// //             <option key={doctor.doctorId} value={doctor.doctorId}>
// //               {doctor.doctorName}
// //             </option>
// //           ))}
// //         </select>

// //         <label>Diagnosis:</label>
// //         <textarea
// //           value={newRecord.diagnosis}
// //           onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
// //           required
// //         />

// //         <label>Treatment:</label>
// //         <textarea
// //           value={newRecord.treatment}
// //           onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
// //         />

// //         <label>Prescription:</label>
// //         <textarea
// //           value={newRecord.prescription}
// //           onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
// //         />

// //         <label>Record Date:</label>
// //         <input
// //           type="datetime-local"
// //           value={newRecord.recordDate}
// //           onChange={(e) => setNewRecord({ ...newRecord, recordDate: e.target.value })}
// //         />

// //         <button type="submit">Add Medical Record</button>
// //       </form>

// //       {error && <p>{error}</p>}

// //       <h4>Medical Records List</h4>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Patient Name</th>
// //             <th>Doctor Name</th>
// //             <th>Diagnosis</th>
// //             <th>Treatment</th>
// //             <th>Prescription</th>
// //             <th>Record Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {medicalRecords.map((record) => (
// //             <tr key={record.record_id}>
// //               <td>{record.patientName}</td>
// //               <td>{record.doctorName}</td>
// //               <td>{record.diagnosis}</td>
// //               <td>{record.treatment}</td>
// //               <td>{record.prescription}</td>
// //               <td>{new Date(record.recordDate).toLocaleString()}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default MedicalRecordsPage;


// import React, { useState, useEffect } from 'react';
// import api from '../services/api';
// import './MedicalRecordsPage.css';

// const MedicalRecordsPage = () => {
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [newRecord, setNewRecord] = useState({
//     patientId: '',
//     doctorId: '',
//     diagnosis: '',
//     treatment: '',
//     prescription: '',
//     recordDate: ''
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch existing medical records
//     const fetchMedicalRecords = async () => {
//       try {
//         const response = await api.get('/api/medical-records');
//         setMedicalRecords(response.data);
//       } catch (error) {
//         console.error('Error fetching medical records:', error);
//       }
//     };

//     // Fetch patients and doctors for dropdowns
//     const fetchDropdownData = async () => {
//       try {
//         const patientsResponse = await api.get('/api/appointments/patients');
//         const doctorsResponse = await api.get('/api/appointments/doctors');
//         setPatients(patientsResponse.data);
//         setDoctors(doctorsResponse.data);
//       } catch (error) {
//         console.error('Error fetching patients or doctors:', error);
//       }
//     };

//     fetchMedicalRecords();
//     fetchDropdownData();
//   }, []);

//   // Get patient name by ID
//   const getPatientName = (patientId) => {
//     const patient = patients.find(p => p.patientId === patientId);
//     return patient ? patient.patientName : 'Unknown';
//   };

//   // Get doctor name by ID
//   const getDoctorName = (doctorId) => {
//     const doctor = doctors.find(d => d.doctorId === doctorId);
//     return doctor ? doctor.doctorName : 'Unknown';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newRecord.patientId || !newRecord.doctorId || !newRecord.diagnosis) {
//       setError('All fields are required.');
//       return;
//     }

//     try {
//       await api.post('/api/medical-records', newRecord);
//       setError('');
//       // Fetch updated list after successful record creation
//       const response = await api.get('/api/medical-records');
//       setMedicalRecords(response.data); // Update the records list
//       setNewRecord({
//         patientId: '',
//         doctorId: '',
//         diagnosis: '',
//         treatment: '',
//         prescription: '',
//         recordDate: ''
//       });
//     } catch (error) {
//       setError('Error creating medical record.');
//     }
//   };

//   return (
//     <div className="medical-records-page">
//       <h3>Medical Records</h3>

//       <form onSubmit={handleSubmit}>
//         <h4>Create New Record</h4>
//         <label>Patient:</label>
//         <select
//           value={newRecord.patientId}
//           onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
//         >
//           <option value="">Select Patient</option>
//           {patients.map((patient) => (
//             <option key={patient.patientId} value={patient.patientId}>
//               {patient.patientName}
//             </option>
//           ))}
//         </select>

//         <label>Doctor:</label>
//         <select
//           value={newRecord.doctorId}
//           onChange={(e) => setNewRecord({ ...newRecord, doctorId: e.target.value })}
//         >
//           <option value="">Select Doctor</option>
//           {doctors.map((doctor) => (
//             <option key={doctor.doctorId} value={doctor.doctorId}>
//               {doctor.doctorName}
//             </option>
//           ))}
//         </select>

//         <label>Diagnosis:</label>
//         <textarea
//           value={newRecord.diagnosis}
//           onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
//           required
//         />

//         <label>Treatment:</label>
//         <textarea
//           value={newRecord.treatment}
//           onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
//         />

//         <label>Prescription:</label>
//         <textarea
//           value={newRecord.prescription}
//           onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
//         />

//         <label>Record Date:</label>
//         <input
//           type="datetime-local"
//           value={newRecord.recordDate}
//           onChange={(e) => setNewRecord({ ...newRecord, recordDate: e.target.value })}
//         />

//         <button type="submit">Add Medical Record</button>
//       </form>

//       {error && <p>{error}</p>}

//       <h4>Medical Records List</h4>
//       <table>
//         <thead>
//           <tr>
//             <th>Patient Name</th>
//             <th>Doctor Name</th>
//             <th>Diagnosis</th>
//             <th>Treatment</th>
//             <th>Prescription</th>
//             <th>Record Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {medicalRecords.map((record) => (
//             <tr key={record.record_id}>
//               <td>{getPatientName(record.patientId)}</td>
//               <td>{getDoctorName(record.doctorId)}</td>
//               <td>{record.diagnosis}</td>
//               <td>{record.treatment}</td>
//               <td>{record.prescription}</td>
//               <td>{new Date(record.recordDate).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MedicalRecordsPage;
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './MedicalRecordsPage.css';

const MedicalRecordsPage = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newRecord, setNewRecord] = useState({
    patientId: '',
    doctorId: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    recordDate: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await api.get('/api/medical-records');
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    const fetchDropdownData = async () => {
      try {
        const patientsResponse = await api.get('/api/appointments/patients');
        const doctorsResponse = await api.get('/api/appointments/doctors');
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error('Error fetching patients or doctors:', error);
      }
    };

    fetchMedicalRecords();
    fetchDropdownData();
  }, []);

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.patientId === patientId);
    return patient ? patient.patientName : 'Unknown';
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.doctorId === doctorId);
    return doctor ? doctor.doctorName : 'Unknown';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRecord.patientId || !newRecord.doctorId || !newRecord.diagnosis) {
      setError('All fields are required.');
      return;
    }

    try {
      await api.post('/api/medical-records', newRecord);
      setError('');
      const response = await api.get('/api/medical-records');
      setMedicalRecords(response.data);
      setNewRecord({
        patientId: '',
        doctorId: '',
        diagnosis: '',
        treatment: '',
        prescription: '',
        recordDate: ''
      });
    } catch (error) {
      setError('Error creating medical record.');
    }
  };

  return (
    <div className="medical-records-page">
      <h3>Medical Records</h3>

      <form onSubmit={handleSubmit}>
        <h4>Create New Record</h4>

        <label>Patient:</label>
        <select
          value={newRecord.patientId}
          onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
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
          value={newRecord.doctorId}
          onChange={(e) => setNewRecord({ ...newRecord, doctorId: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorId} value={doctor.doctorId}>
              {doctor.doctorName}
            </option>
          ))}
        </select>

        <label>Diagnosis:</label>
        <textarea
          value={newRecord.diagnosis}
          onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
          required
        />

        <label>Treatment:</label>
        <textarea
          value={newRecord.treatment}
          onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
        />

        <label>Prescription:</label>
        <textarea
          value={newRecord.prescription}
          onChange={(e) => setNewRecord({ ...newRecord, prescription: e.target.value })}
        />

        <label>Record Date:</label>
        <input
          type="datetime-local"
          value={newRecord.recordDate}
          onChange={(e) => setNewRecord({ ...newRecord, recordDate: e.target.value })}
        />

        <button type="submit">Add Medical Record</button>
      </form>

      {error && <p>{error}</p>}

      <h4>Medical Records List</h4>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Prescription</th>
            <th>Record Date</th>
          </tr>
        </thead>
        <tbody>
          {medicalRecords.map((record) => (
            <tr key={record.record_id}>
              <td>{getPatientName(record.patientId)}</td>
              <td>{getDoctorName(record.doctorId)}</td>
              <td>{record.diagnosis}</td>
              <td>{record.treatment}</td>
              <td>{record.prescription}</td>
              <td>{new Date(record.recordDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecordsPage;
