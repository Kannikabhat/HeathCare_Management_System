

package com.service.impl;

import com.dto.DoctorDTO;
import com.model.ContactDetail;
import com.model.Doctor;
import com.model.Specialization;
import com.repository.ContactDetailRepository;
import com.repository.DoctorRepository;
import com.repository.SpecializationRepository;
import com.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SpecializationRepository specializationRepository;

    @Autowired
    private ContactDetailRepository contactDetailRepository;

    @Override
    public ResponseEntity<String> createDoctor(DoctorDTO dto) {
        try {
            // Create ContactDetail first
            ContactDetail contact = new ContactDetail();
            contact.setEmail(dto.getEmail());
            contact.setPhoneNumber(dto.getPhoneNumber());
            ContactDetail savedContact = contactDetailRepository.save(contact);

            // Create Doctor and link to ContactDetail
            Doctor doctor = new Doctor();
            doctor.setDoctorName(dto.getDoctorName());
            doctor.setSpecialization(specializationRepository.findById(dto.getSpecializationId()).orElse(null));  // Set Specialization
            doctor.setContactDetail(savedContact); // Link the ContactDetail object
            doctor.setAddress(dto.getAddress());

            // Save the Doctor
            doctorRepository.save(doctor);
            return ResponseEntity.ok("Doctor created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to create doctor: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        List<DoctorDTO> dtoList = new ArrayList<>();

        for (Doctor doctor : doctors) {
            DoctorDTO dto = new DoctorDTO();
            dto.setDoctorId(doctor.getDoctorId());
            dto.setDoctorName(doctor.getDoctorName());
            dto.setAddress(doctor.getAddress());
            dto.setSpecializationId(doctor.getSpecialization().getId());

            // Fetch Specialization by ID
            Optional<Specialization> specOpt = specializationRepository.findById(doctor.getSpecialization().getId());
            specOpt.ifPresent(s -> dto.setSpecializationName(s.getSpecializationName()));

            // Fetch Contact Details from ContactDetail object
            ContactDetail contact = doctor.getContactDetail();
            if (contact != null) {
                dto.setPhoneNumber(contact.getPhoneNumber());
                dto.setEmail(contact.getEmail());
            }

            dtoList.add(dto);
        }

        return ResponseEntity.ok(dtoList);
    }

    @Override
    public ResponseEntity<DoctorDTO> getDoctorById(int id) {  // Use int for doctorId
        Optional<Doctor> doctorOpt = doctorRepository.findById(id);
        if (doctorOpt.isEmpty()) return ResponseEntity.notFound().build();

        Doctor doctor = doctorOpt.get();
        DoctorDTO dto = new DoctorDTO();
        dto.setDoctorId(doctor.getDoctorId());
        dto.setDoctorName(doctor.getDoctorName());
        dto.setAddress(doctor.getAddress());
        dto.setSpecializationId(doctor.getSpecialization().getId());

        // Fetch Specialization by ID
        Optional<Specialization> specOpt = specializationRepository.findById(doctor.getSpecialization().getId());
        specOpt.ifPresent(s -> dto.setSpecializationName(s.getSpecializationName()));

        // Fetch Contact Details from ContactDetail object
        ContactDetail contact = doctor.getContactDetail();
        if (contact != null) {
            dto.setPhoneNumber(contact.getPhoneNumber());
            dto.setEmail(contact.getEmail());
        }

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<String> updateDoctor(int id, DoctorDTO dto) {  // Use int for doctorId
        Optional<Doctor> doctorOpt = doctorRepository.findById(id);
        if (doctorOpt.isEmpty()) return ResponseEntity.notFound().build();

        Doctor doctor = doctorOpt.get();
        doctor.setDoctorName(dto.getDoctorName());
        doctor.setAddress(dto.getAddress());
        doctor.setSpecialization(specializationRepository.findById(dto.getSpecializationId()).orElse(null));

        // Update ContactDetail
        ContactDetail contact = doctor.getContactDetail();
        if (contact != null) {
            contact.setEmail(dto.getEmail());
            contact.setPhoneNumber(dto.getPhoneNumber());
            contactDetailRepository.save(contact);
        }

        doctorRepository.save(doctor);
        return ResponseEntity.ok("Doctor updated successfully");
    }

    @Override
    public ResponseEntity<String> deleteDoctor(int id) {  // Use int for doctorId
        Optional<Doctor> doctorOpt = doctorRepository.findById(id);
        if (doctorOpt.isEmpty()) return ResponseEntity.notFound().build();

        Doctor doctor = doctorOpt.get();
        contactDetailRepository.deleteById(doctor.getContactDetail().getContactId());  // Use the ContactDetail's ID for deletion
        doctorRepository.deleteById(id);
        return ResponseEntity.ok("Doctor deleted successfully");
    }
}
