package com.novaid.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.novaid.models.VisitStatus;

public class VisitResponse {
    private Long id;
    private Long familyId;
    private Long volunteerId;
    private String familyName;
    private String familyAddress;
    private Double familyLatitude;
    private Double familyLongitude;
    private List<String> needs;
    private LocalDateTime visitDate;
    private VisitStatus status;
    private String notes;
    private Double checkInLat;
    private Double checkInLng;
    private LocalDateTime checkInTime;
    private String proofPhotoPath;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getFamilyAddress() {
        return familyAddress;
    }

    public void setFamilyAddress(String familyAddress) {
        this.familyAddress = familyAddress;
    }

    public Double getFamilyLatitude() {
        return familyLatitude;
    }

    public void setFamilyLatitude(Double familyLatitude) {
        this.familyLatitude = familyLatitude;
    }

    public Double getFamilyLongitude() {
        return familyLongitude;
    }

    public void setFamilyLongitude(Double familyLongitude) {
        this.familyLongitude = familyLongitude;
    }

    public List<String> getNeeds() {
        return needs;
    }

    public void setNeeds(List<String> needs) {
        this.needs = needs;
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
