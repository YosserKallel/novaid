package com.novaid.dto;

import java.util.ArrayList;
import java.util.List;

public class DashboardSummary {
    private int totalFamilies;
    private int urgentFamilies;
    private int visitsCount;
    private List<NeedsSlice> needs = new ArrayList<>();
    private List<DailyVisits> weeklyVisits = new ArrayList<>();

    public int getTotalFamilies() {
        return totalFamilies;
    }

    public void setTotalFamilies(int totalFamilies) {
        this.totalFamilies = totalFamilies;
    }

    public int getUrgentFamilies() {
        return urgentFamilies;
    }

    public void setUrgentFamilies(int urgentFamilies) {
        this.urgentFamilies = urgentFamilies;
    }

    public int getVisitsCount() {
        return visitsCount;
    }

    public void setVisitsCount(int visitsCount) {
        this.visitsCount = visitsCount;
    }

    public List<NeedsSlice> getNeeds() {
        return needs;
    }

    public void setNeeds(List<NeedsSlice> needs) {
        this.needs = needs;
    }

    public List<DailyVisits> getWeeklyVisits() {
        return weeklyVisits;
    }

    public void setWeeklyVisits(List<DailyVisits> weeklyVisits) {
        this.weeklyVisits = weeklyVisits;
    }

    public static class NeedsSlice {
        private String name;
        private int value;

        public NeedsSlice() {
        }

        public NeedsSlice(String name, int value) {
            this.name = name;
            this.value = value;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getValue() {
            return value;
        }

        public void setValue(int value) {
            this.value = value;
        }
    }

    public static class DailyVisits {
        private String date;
        private int visits;

        public DailyVisits() {
        }

        public DailyVisits(String date, int visits) {
            this.date = date;
            this.visits = visits;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public int getVisits() {
            return visits;
        }

        public void setVisits(int visits) {
            this.visits = visits;
        }
    }
}
