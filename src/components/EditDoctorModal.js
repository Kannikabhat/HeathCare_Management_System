import React, { useState, useEffect } from 'react';
import api from '../services/api';

const EditDoctorModal = ({ doctor, onClose, refreshDoctors }) => {
    const [updatedDoctor, setUpdatedDoctor] = useState({ ...doctor });
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the specializations
        const fetchSpecializations = async () => {
            try {
                const response = await api.get('/api/specializations');
                setSpecializations(response.data);
                setLoading(false); // Data fetched, stop loading
            } catch (error) {
                console.error('Error fetching specializations:', error);
                setLoading(false); // Stop loading on error as well
            }
        };

        fetchSpecializations();
    }, []);

    // Update the state whenever the doctor prop changes
    useEffect(() => {
        setUpdatedDoctor({ ...doctor });
    }, [doctor]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Update doctor data via API
            await api.put(`/api/doctors/${doctor.doctorId}`, updatedDoctor);
            refreshDoctors(); // Refresh the list of doctors after update
            onClose(); // Close the modal after successful update
            alert("Doctor updated successfully");
        } catch (error) {
            console.error('Error updating doctor:', error);
            alert("Error updating doctor");
        }
    };

    // Loading specializations data
    if (loading) {
        return <p>Loading specializations...</p>;
    }

    return (
        <div className="modal">
            <h2>Edit Doctor</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={updatedDoctor.doctorName}
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, doctorName: e.target.value })}
                    placeholder="Doctor Name"
                    required
                />
                <select
                    value={updatedDoctor.specializationId || ''}
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, specializationId: e.target.value })}
                    required
                >
                    <option value="">Select Specialization</option>
                    {specializations.map((spec) => (
                        <option key={spec.id} value={spec.id}>
                            {spec.specializationName}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={updatedDoctor.phoneNumber}
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, phoneNumber: e.target.value })}
                    placeholder="Phone Number"
                    required
                />
                <input
                    type="text"
                    value={updatedDoctor.address}
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, address: e.target.value })}
                    placeholder="Address"
                    required
                />
                <input
                    type="email"
                    value={updatedDoctor.email || ''} // Handle email with fallback
                    onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, email: e.target.value })}
                    placeholder="Email"
                    required
                />
                <button type="submit">Update Doctor</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditDoctorModal;
