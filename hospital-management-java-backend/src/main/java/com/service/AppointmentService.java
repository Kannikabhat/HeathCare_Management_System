package com.service;

import com.model.Appointment;
import com.model.Doctor;
import com.model.Patient;

import java.util.List;

public interface AppointmentService {
    void createAppointment(Appointment appointment);
    List<Patient> getPatientsForAppointment();
    List<Doctor> getDoctorsForAppointment();
    List<Appointment> getAppointments();
    void updateAppointment(int id, Appointment appointment);
    void deleteAppointment(int id);
    List<Patient> getPatientsForDoctor(int doctorId);
}
