package com.service.impl;

import com.model.Appointment;
import com.model.Doctor;
import com.model.Patient;
import com.repository.AppointmentRepository;
import com.repository.DoctorRepository;
import com.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.service.AppointmentService;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public void createAppointment(Appointment appointment) {
        appointmentRepository.save(appointment);
    }

    @Override
    public List<Patient> getPatientsForAppointment() {
        return patientRepository.findAll();
    }

    @Override
    public List<Doctor> getDoctorsForAppointment() {
        return doctorRepository.findAll();
    }

    @Override
    public List<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public void updateAppointment(int id, Appointment appointment) {
        appointment.setAppointmentId( id); // ✅ Cast to Long
        appointmentRepository.save(appointment);
    }

    @Override
    public void deleteAppointment(int id) {
        appointmentRepository.deleteById( id); // also cast to Long here
    }

    @Override
    public List<Patient> getPatientsForDoctor(int doctorId) {
        return patientRepository.findByDoctor_DoctorId(doctorId);
    }
}
