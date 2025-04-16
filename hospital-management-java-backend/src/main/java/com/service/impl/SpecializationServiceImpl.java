package com.service.impl;

import com.model.Specialization;
import com.repository.SpecializationRepository;
import com.service.SpecializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecializationServiceImpl implements SpecializationService {

    @Autowired
    private SpecializationRepository specializationRepository;

    @Override
    public ResponseEntity<List<Specialization>> getAllSpecializations() {
        List<Specialization> list = specializationRepository.findAll();
        return ResponseEntity.ok(list);
    }
}
