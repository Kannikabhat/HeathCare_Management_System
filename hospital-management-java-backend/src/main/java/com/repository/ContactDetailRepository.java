package com.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.model.ContactDetail;


public interface ContactDetailRepository extends JpaRepository<ContactDetail, Integer> {
}

