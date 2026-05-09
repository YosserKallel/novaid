package com.novaid.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.novaid.models.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    @Override
    @EntityGraph(attributePaths = {"family", "family.needs", "volunteer"})
    List<Visit> findAll();

    List<Visit> findByVisitDateBetween(LocalDateTime start, LocalDateTime end);

    @EntityGraph(attributePaths = {"family", "family.needs", "volunteer"})
    List<Visit> findByFamilyId(Long familyId);

    @EntityGraph(attributePaths = {"family", "family.needs", "volunteer"})
    List<Visit> findByVolunteerId(Long volunteerId);
}
