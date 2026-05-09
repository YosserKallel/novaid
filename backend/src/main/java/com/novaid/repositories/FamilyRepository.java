package com.novaid.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaid.models.Family;

public interface FamilyRepository extends JpaRepository<Family, Long> {
    long countByUrgencyIndexGreaterThanEqual(int urgencyIndex);

    long countByUrgencyIndexGreaterThanEqualAndActiveTrue(int urgencyIndex);

    List<Family> findByUrgencyIndexGreaterThanEqual(int urgencyIndex);

    List<Family> findByActiveTrue();
}
