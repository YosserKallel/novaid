package com.novaid.dto;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class FamilyRequest {
    @NotBlank
    private String headName;

    private String address;

    @Min(0)
    private int urgencyIndex;

    private List<String> needs;

    private Double latitude;

    private Double longitude;

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
}
