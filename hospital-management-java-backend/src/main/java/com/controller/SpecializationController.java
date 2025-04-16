package com.controller;

import com.model.Specialization;
import com.service.SpecializationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specializations")
@CrossOrigin
public class SpecializationController {
    @Autowired
    private SpecializationService specializationService;

    @GetMapping
    public ResponseEntity<List<Specialization>> getAllSpecializations() {
        return specializationService.getAllSpecializations();
    }
}
