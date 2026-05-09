package com.novaid.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import com.novaid.dto.VisitRequest;
import com.novaid.dto.VisitResponse;
import com.novaid.models.Family;
import com.novaid.models.User;
import com.novaid.models.Visit;
import com.novaid.models.VisitStatus;
import com.novaid.repositories.FamilyRepository;
import com.novaid.repositories.UserRepository;
import com.novaid.repositories.VisitRepository;

@RestController
@RequestMapping("/api/visits")
public class VisitController {
    private final VisitRepository visitRepository;
    private final FamilyRepository familyRepository;
    private final UserRepository userRepository;

    public VisitController(VisitRepository visitRepository, FamilyRepository familyRepository, UserRepository userRepository) {
        this.visitRepository = visitRepository;
        this.familyRepository = familyRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<VisitResponse> getAllVisits() {
        return visitRepository.findAll().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @GetMapping("/family/{familyId}")
    public List<VisitResponse> getByFamily(@PathVariable Long familyId) {
        return visitRepository.findByFamilyId(familyId).stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @GetMapping("/volunteer/{volunteerId}")
    public List<VisitResponse> getByVolunteer(@PathVariable Long volunteerId) {
        return visitRepository.findByVolunteerId(volunteerId).stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<VisitResponse> createVisit(@Valid @RequestBody VisitRequest request) {
        Visit visit = new Visit();
        applyRequest(visit, request);
        Visit saved = visitRepository.save(visit);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    @PutMapping("/{id}")
    public VisitResponse updateVisit(@PathVariable Long id, @Valid @RequestBody VisitRequest request) {
        Visit visit = visitRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Visit not found"));
        applyRequest(visit, request);
        Visit saved = visitRepository.save(visit);
        return toResponse(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        Visit visit = visitRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Visit not found"));
        visitRepository.delete(visit);
        return ResponseEntity.noContent().build();
    }

    private void applyRequest(Visit visit, VisitRequest request) {
        Family family = familyRepository.findById(request.getFamilyId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Family not found"));
        User volunteer = userRepository.findById(request.getVolunteerId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Volunteer not found"));

        visit.setFamily(family);
        visit.setVolunteer(volunteer);
        visit.setVisitDate(request.getVisitDate());
        visit.setStatus(request.getStatus() == null ? VisitStatus.PLANNED : request.getStatus());
        visit.setNotes(request.getNotes());
        visit.setCheckInLat(request.getCheckInLat());
        visit.setCheckInLng(request.getCheckInLng());
        visit.setCheckInTime(request.getCheckInTime());
        visit.setProofPhotoPath(request.getProofPhotoPath());
    }

    private VisitResponse toResponse(Visit visit) {
        VisitResponse response = new VisitResponse();
        response.setId(visit.getId());
        response.setVisitDate(visit.getVisitDate());
        response.setStatus(visit.getStatus());
        response.setNotes(visit.getNotes());
        response.setCheckInLat(visit.getCheckInLat());
        response.setCheckInLng(visit.getCheckInLng());
        response.setCheckInTime(visit.getCheckInTime());
        response.setProofPhotoPath(visit.getProofPhotoPath());

        Family family = null;
        try {
            family = visit.getFamily();
        } catch (EntityNotFoundException ex) {
            family = null;
        }

        if (family != null) {
            response.setFamilyId(family.getId());
            response.setFamilyName(family.getHeadName());
            response.setFamilyAddress(family.getAddress());
            response.setNeeds(family.getNeeds());
            if (family.getGps() != null) {
                response.setFamilyLatitude(family.getGps().getLatitude());
                response.setFamilyLongitude(family.getGps().getLongitude());
            }
        }

        User volunteer = null;
        try {
            volunteer = visit.getVolunteer();
        } catch (EntityNotFoundException ex) {
            volunteer = null;
        }

        if (volunteer != null) {
            response.setVolunteerId(volunteer.getId());
        }

        return response;
    }
}
