package com.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contactdetails")

public class ContactDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contactId;  // Change from int to int

    private String phoneNumber;
    private String email;

    // Getters and Setters

    public int getContactId() {  // Change return type to int
        return contactId;
    }

    public void setContactId(int contactId) {  // Change parameter type to int
        this.contactId = contactId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
