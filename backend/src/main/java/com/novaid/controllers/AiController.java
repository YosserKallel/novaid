package com.novaid.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.novaid.dto.AiSummaryRequest;
import com.novaid.services.AiSummaryService;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final AiSummaryService aiSummaryService;

    public AiController(AiSummaryService aiSummaryService) {
        this.aiSummaryService = aiSummaryService;
    }

    @PostMapping("/impact-summary")
    public ResponseEntity<Map<String, String>> generateImpactSummary(@RequestBody AiSummaryRequest request) {
        try {
            return ResponseEntity.ok(Map.of("summary", aiSummaryService.summarize(request)));
        } catch (IllegalStateException ex) {
            HttpStatus status = ex.getMessage().contains("not configured")
                ? HttpStatus.SERVICE_UNAVAILABLE
                : HttpStatus.BAD_GATEWAY;
            return ResponseEntity.status(status).body(Map.of("message", ex.getMessage()));
        }
    }
}
