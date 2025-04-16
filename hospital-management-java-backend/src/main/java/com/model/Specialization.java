package com.model;

import jakarta.persistence.*;

@Entity
@Table(name = "specializations")
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int specializationId;

    @Column(name = "specialization_name", nullable = false)
    private String specializationName;

    // Constructors
    public Specialization() {}

    public Specialization(String specializationName) {
        this.specializationName = specializationName;
    }

    // Getters and Setters
    public int getId() {
        return specializationId;
    }

    public void setId(int specializationId) {
        this.specializationId = specializationId;
    }

    public String getSpecializationName() {
        return specializationName;
    }

    public void setSpecializationName(String specializationName) {
        this.specializationName = specializationName;
    }
}
