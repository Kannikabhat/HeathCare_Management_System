package com.service;

import com.model.MedicalRecord;
import java.util.List;

public interface MedicalRecordService {
    List<MedicalRecord> getAllRecords();
    List<MedicalRecord> getRecordsByPatient(int patientId);
    MedicalRecord createRecord(MedicalRecord record);
    MedicalRecord updateRecord(int id, MedicalRecord updatedRecord);
    void deleteRecord(int id);
}
