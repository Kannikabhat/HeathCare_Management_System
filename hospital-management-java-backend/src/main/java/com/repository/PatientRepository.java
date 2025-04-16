package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.model.Patient;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
    List<Patient> findByDoctor_DoctorId(int doctorId);
}
