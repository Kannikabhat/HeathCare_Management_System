package com.service.impl;

import com.dto.PatientDTO;
import com.model.ContactDetail;
import com.model.Patient;
import com.repository.ContactDetailRepository;
import com.repository.PatientRepository;
import com.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private ContactDetailRepository contactRepo;

    @Transactional
    public PatientDTO createPatient(PatientDTO dto) {
        ContactDetail contact = new ContactDetail();
        contact.setPhoneNumber(dto.getPhoneNumber());
        contact.setEmail(dto.getEmail());
        ContactDetail savedContact = contactRepo.save(contact);

        Patient patient = new Patient();
        patient.setPatientName(dto.getPatientName());
        patient.setAddress(dto.getAddress());
        patient.setAge(dto.getAge());
        patient.setContactDetail(savedContact);

        Patient savedPatient = patientRepo.save(patient);

        dto.setPatientId((int)savedPatient.getPatientId());
        return dto;
    }

    public List<PatientDTO> getAllPatients() {
        return patientRepo.findAll().stream().map(this::toDTO).toList();
    }

    public PatientDTO getPatientById(int id) {
        return patientRepo.findById(id).map(this::toDTO).orElseThrow();
    }

    @Transactional
    public PatientDTO updatePatient(int id, PatientDTO dto) {
        Patient patient = patientRepo.findById(id).orElseThrow();

        patient.setPatientName(dto.getPatientName());
        patient.setAddress(dto.getAddress());
        patient.setAge(dto.getAge());

        ContactDetail contact = patient.getContactDetail();
        contact.setPhoneNumber(dto.getPhoneNumber());
        contact.setEmail(dto.getEmail());

        contactRepo.save(contact);
        patientRepo.save(patient);

        return toDTO(patient);
    }

    public void deletePatient(int id) {
        patientRepo.deleteById(id);
    }

    public int getPatientCount() {
        return (int) patientRepo.count();
    }

    private PatientDTO toDTO(Patient p) {
        PatientDTO dto = new PatientDTO();
        dto.setPatientId((int)p.getPatientId());
        dto.setPatientName(p.getPatientName());
        dto.setAddress(p.getAddress());
        dto.setAge(p.getAge());

        ContactDetail c = p.getContactDetail();
        dto.setPhoneNumber(c.getPhoneNumber());
        dto.setEmail(c.getEmail());

        return dto;
    }
}
