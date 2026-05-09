package com.novaid.controllers;

import java.util.ArrayList;
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

import jakarta.validation.Valid;

import com.novaid.dto.FamilyRequest;
import com.novaid.dto.FamilyResponse;
import com.novaid.models.Family;
import com.novaid.models.GpsCoordinates;
import com.novaid.repositories.FamilyRepository;

@RestController
@RequestMapping("/api/families")
public class FamilyController {
    private final FamilyRepository familyRepository;

    public FamilyController(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }

    @GetMapping
    public List<FamilyResponse> getAllFamilies() {
        return familyRepository.findByActiveTrue().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public FamilyResponse getFamily(@PathVariable Long id) {
        Family family = familyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Family not found"));
        if (!family.isActive()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Family not found");
        }
        return toResponse(family);
    }

    @PostMapping
    public ResponseEntity<FamilyResponse> createFamily(@Valid @RequestBody FamilyRequest request) {
        Family family = new Family();
        applyRequest(family, request);
        family.setActive(true);

        Family saved = familyRepository.save(family);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    @PutMapping("/{id}")
    public FamilyResponse updateFamily(@PathVariable Long id, @Valid @RequestBody FamilyRequest request) {
        Family family = familyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Family not found"));
        if (!family.isActive()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Family not found");
        }

        applyRequest(family, request);
        Family saved = familyRepository.save(family);
        return toResponse(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id) {
        Family family = familyRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Family not found"));
        if (family.isActive()) {
            family.setActive(false);
            familyRepository.save(family);
        }
        return ResponseEntity.noContent().build();
    }

    private FamilyResponse toResponse(Family family) {
        FamilyResponse response = new FamilyResponse();
        response.setId(family.getId());
        response.setHeadName(family.getHeadName());
        response.setAddress(family.getAddress());
        response.setUrgencyIndex(family.getUrgencyIndex());
        response.setNeeds(family.getNeeds());
        if (family.getGps() != null) {
            response.setLatitude(family.getGps().getLatitude());
            response.setLongitude(family.getGps().getLongitude());
        }
        response.setActive(family.isActive());
        return response;
    }

    private void applyRequest(Family family, FamilyRequest request) {
        family.setHeadName(request.getHeadName());
        family.setAddress(request.getAddress());
        family.setUrgencyIndex(request.getUrgencyIndex());

        List<String> needs = request.getNeeds();
        family.setNeeds(needs == null ? new ArrayList<>() : new ArrayList<>(needs));

        if (request.getLatitude() != null && request.getLongitude() != null) {
            family.setGps(new GpsCoordinates(request.getLatitude(), request.getLongitude()));
        } else {
            family.setGps(null);
        }
    }
}
