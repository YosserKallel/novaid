package com.novaid.dto;

import java.util.List;

public class FamilyResponse {
    private Long id;
    private String headName;
    private String address;
    private int urgencyIndex;
    private List<String> needs;
    private Double latitude;
    private Double longitude;
    private boolean active;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeadName() {
        return headName;
    }

    public void setHeadName(String headName) {
        this.headName = headName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getUrgencyIndex() {
        return urgencyIndex;
    }

    public void setUrgencyIndex(int urgencyIndex) {
        this.urgencyIndex = urgencyIndex;
    }

    public List<String> getNeeds() {
        return needs;
    }

    public void setNeeds(List<String> needs) {
        this.needs = needs;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
