package com.novaid.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaid.dto.DashboardSummary;
import com.novaid.dto.DashboardSummary.DailyVisits;
import com.novaid.dto.DashboardSummary.NeedsSlice;
import com.novaid.models.Family;
import com.novaid.models.Visit;
import com.novaid.repositories.FamilyRepository;
import com.novaid.repositories.VisitRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private static final int URGENT_THRESHOLD = 7;
    private static final DateTimeFormatter DAY_FORMAT = DateTimeFormatter.ofPattern("dd/MM");

    private final FamilyRepository familyRepository;
    private final VisitRepository visitRepository;

    public DashboardController(FamilyRepository familyRepository, VisitRepository visitRepository) {
        this.familyRepository = familyRepository;
        this.visitRepository = visitRepository;
    }

    @GetMapping("/summary")
    public DashboardSummary getSummary() {
        DashboardSummary summary = new DashboardSummary();

        List<Family> families = familyRepository.findByActiveTrue();
        summary.setTotalFamilies(families.size());
        summary.setUrgentFamilies((int) familyRepository.countByUrgencyIndexGreaterThanEqualAndActiveTrue(URGENT_THRESHOLD));
        summary.setVisitsCount((int) visitRepository.count());
        summary.setNeeds(buildNeeds(families));
        summary.setWeeklyVisits(buildWeeklyVisits());

        return summary;
    }

    private List<NeedsSlice> buildNeeds(List<Family> families) {
        Map<String, Long> counts = families.stream()
            .flatMap(family -> family.getNeeds().stream())
            .collect(Collectors.groupingBy(need -> need, Collectors.counting()));

        return counts.entrySet().stream()
            .sorted(Map.Entry.comparingByKey())
            .map(entry -> new NeedsSlice(entry.getKey(), entry.getValue().intValue()))
            .collect(Collectors.toList());
    }

    private List<DailyVisits> buildWeeklyVisits() {
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusDays(6);
        LocalDateTime startDateTime = start.atStartOfDay();
        LocalDateTime endDateTime = today.plusDays(1).atStartOfDay().minusNanos(1);

        List<Visit> visits = visitRepository.findByVisitDateBetween(startDateTime, endDateTime);
        Map<LocalDate, Long> byDay = visits.stream()
            .collect(Collectors.groupingBy(visit -> visit.getVisitDate().toLocalDate(), Collectors.counting()));

        List<DailyVisits> result = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate day = today.minusDays(i);
            int count = byDay.getOrDefault(day, 0L).intValue();
            result.add(new DailyVisits(day.format(DAY_FORMAT), count));
        }

        return result;
    }
}
