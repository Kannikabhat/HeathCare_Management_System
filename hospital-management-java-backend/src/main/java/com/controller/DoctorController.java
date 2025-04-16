
package com.controller;

import com.dto.DoctorDTO;
import com.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public ResponseEntity<String> createDoctor(@RequestBody DoctorDTO doctorDTO) {
        return doctorService.createDoctor(doctorDTO); // Calls the service layer to create a doctor
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getDoctors() {
        return doctorService.getAllDoctors(); // Calls the service layer to fetch all doctors
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable int id) { // Change id to int
        return doctorService.getDoctorById(id); // Calls the service layer to get doctor by ID
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDoctor(@PathVariable int id, @RequestBody DoctorDTO doctorDTO) { // Change id to int
        return doctorService.updateDoctor(id, doctorDTO); // Calls the service layer to update doctor
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable int id) { // Change id to int
        return doctorService.deleteDoctor(id); // Calls the service layer to delete a doctor
    }
}
