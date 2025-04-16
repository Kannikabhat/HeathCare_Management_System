package com.controller;

import com.model.MedicalRecord;
import com.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService service;

    @GetMapping
    public List<MedicalRecord> getAllRecords() {
        return service.getAllRecords();
    }

    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord> getRecordsByPatient(@PathVariable int patientId) {
        return service.getRecordsByPatient(patientId);
    }

    @PostMapping
    public MedicalRecord createRecord(@RequestBody MedicalRecord record) {
        return service.createRecord(record);
    }

    @PutMapping("/{id}")
    public MedicalRecord updateRecord(@PathVariable int id, @RequestBody MedicalRecord record) {
        return service.updateRecord(id, record);
    }

    @DeleteMapping("/{id}")
    public void deleteRecord(@PathVariable int id) {
        service.deleteRecord(id);
    }
}
