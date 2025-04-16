package com.service;

import com.model.Specialization;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SpecializationService {
    ResponseEntity<List<Specialization>> getAllSpecializations();
}
