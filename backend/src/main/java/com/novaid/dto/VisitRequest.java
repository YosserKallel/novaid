package com.novaid.dto;

import java.time.LocalDateTime;

import com.novaid.models.VisitStatus;

import jakarta.validation.constraints.NotNull;

public class VisitRequest {
    @NotNull
    private Long familyId;

    @NotNull
    private Long volunteerId;

    @NotNull
    private LocalDateTime visitDate;

    private VisitStatus status;

    private String notes;

    private Double checkInLat;

    private Double checkInLng;

    private LocalDateTime checkInTime;

    private String proofPhotoPath;

    public Long getFamilyId() {
        return familyId;
    }

    public void setFamilyId(Long familyId) {
        this.familyId = familyId;
    }

    public Long getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(Long volunteerId) {
        this.volunteerId = volunteerId;
    }

    public LocalDateTime getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDateTime visitDate) {
        this.visitDate = visitDate;
    }

    public VisitStatus getStatus() {
        return status;
    }

    public void setStatus(VisitStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Double getCheckInLat() {
        return checkInLat;
    }

    public void setCheckInLat(Double checkInLat) {
        this.checkInLat = checkInLat;
    }

    public Double getCheckInLng() {
        return checkInLng;
    }

    public void setCheckInLng(Double checkInLng) {
        this.checkInLng = checkInLng;
    }

    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalDateTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public String getProofPhotoPath() {
        return proofPhotoPath;
    }

    public void setProofPhotoPath(String proofPhotoPath) {
        this.proofPhotoPath = proofPhotoPath;
    }
}
