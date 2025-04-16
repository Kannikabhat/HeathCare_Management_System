package com.service.impl;

import com.model.MedicalRecord;
import com.repository.MedicalRecordRepository;
import com.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    private MedicalRecordRepository repository;

    @Override
    public List<MedicalRecord> getAllRecords() {
        return repository.findAll();
    }

    @Override
    public List<MedicalRecord> getRecordsByPatient(int patientId) {
        return repository.findByPatientId(patientId);
    }

    @Override
    public MedicalRecord createRecord(MedicalRecord record) {
        return repository.save(record);
    }

    @Override
    public MedicalRecord updateRecord(int id, MedicalRecord updatedRecord) {
        MedicalRecord existing = repository.findById(id).orElseThrow();
        existing.setDiagnosis(updatedRecord.getDiagnosis());
        existing.setTreatment(updatedRecord.getTreatment());
        existing.setPrescription(updatedRecord.getPrescription());
        existing.setRecordDate(updatedRecord.getRecordDate());
        return repository.save(existing);
    }

    @Override
    public void deleteRecord(int id) {
        repository.deleteById(id);
    }
}
