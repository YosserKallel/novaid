package com.novaid.dto;

import java.util.List;

public record AiSummaryRequest(
    String familyName,
    String address,
    Integer urgencyIndex,
    List<String> needs,
    List<VisitSummary> visits
) {
    public record VisitSummary(
        String date,
        String status,
        String notes
    ) {}
}
