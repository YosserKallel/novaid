package com.novaid.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "visits")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "family_id")
    private Family family;

    @ManyToOne(optional = false)
    @JoinColumn(name = "volunteer_id")
    private User volunteer;

    @Column(nullable = false)
    private LocalDateTime visitDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VisitStatus status = VisitStatus.PLANNED;

    @Column(length = 2000)
    private String notes;

    private Double checkInLat;

    private Double checkInLng;

    private LocalDateTime checkInTime;

    private String proofPhotoPath;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Family getFamily() {
        return family;
    }

    public void setFamily(Family family) {
        this.family = family;
    }

    public User getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(User volunteer) {
        this.volunteer = volunteer;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
