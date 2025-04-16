package com.controller;

import com.model.Appointment;
import com.model.Doctor;
import com.model.Patient;
import com.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Create appointment
    @PostMapping
    public ResponseEntity<String> createAppointment(@RequestBody Appointment appointment) {
        try {
            appointmentService.createAppointment(appointment);
            return ResponseEntity.status(201).body("Appointment created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating appointment: " + e.getMessage());
        }
    }

    // Get all patients for dropdown
    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatientsForAppointment() {
        try {
            return ResponseEntity.ok(appointmentService.getPatientsForAppointment());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Get all doctors for dropdown
    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getDoctorsForAppointment() {
        try {
            return ResponseEntity.ok(appointmentService.getDoctorsForAppointment());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Fetch all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments() {
        try {
            return ResponseEntity.ok(appointmentService.getAppointments());
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Update appointment
    @PutMapping("/{id}")
    public ResponseEntity<String> updateAppointment(@PathVariable int id, @RequestBody Appointment appointment) {
        try {
            appointmentService.updateAppointment(id, appointment);
            return ResponseEntity.ok("Appointment updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating appointment: " + e.getMessage());
        }
    }

    // Delete appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable int id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok("Appointment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting appointment: " + e.getMessage());
        }
    }

    // Get patients for specific doctor
    @GetMapping("/doctor/{doctorId}/patients")
    public ResponseEntity<List<Patient>> getPatientsForDoctor(@PathVariable int doctorId) {
        try {
            return ResponseEntity.ok(appointmentService.getPatientsForDoctor(doctorId));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
