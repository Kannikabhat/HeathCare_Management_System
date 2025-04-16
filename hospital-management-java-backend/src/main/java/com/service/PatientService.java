package com.service;
import com.dto.PatientDTO;
import java.util.List;


public interface PatientService {

    PatientDTO createPatient(PatientDTO dto);
    List<PatientDTO> getAllPatients();
    PatientDTO getPatientById(int id);
    PatientDTO updatePatient(int id, PatientDTO dto);
    void deletePatient(int id);
    int getPatientCount();
}
