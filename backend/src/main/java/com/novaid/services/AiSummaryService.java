package com.novaid.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.novaid.dto.AiSummaryRequest;

@Service
public class AiSummaryService {
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String apiKey;
    private final String model;

    public AiSummaryService(
        RestClient.Builder restClientBuilder,
        ObjectMapper objectMapper,
        @Value("${openai.api-key:}") String apiKey,
        @Value("${openai.model:gpt-4o-mini}") String model,
        @Value("${openai.base-url:https://api.openai.com/v1}") String baseUrl
    ) {
        this.restClient = restClientBuilder.baseUrl(baseUrl).build();
        this.objectMapper = objectMapper;
        this.apiKey = apiKey;
        this.model = model;
    }

    public String summarize(AiSummaryRequest request) {
        String context = buildContext(request);
        Map<String, Object> payload = Map.of(
            "model", model,
            "temperature", 0.3,
            "messages", List.of(
                Map.of(
                    "role", "system",
                    "content", "You summarize NGO field reports in clear, respectful French. " +
                        "Use only the supplied facts. Never invent medical, financial, or personal details. " +
                        "Return one concise paragraph of 60 to 100 words."
                ),
                Map.of(
                    "role", "user",
                    "content", context
                )
            )
        );

        var requestSpec = restClient.post()
            .uri("/chat/completions")
            .contentType(MediaType.APPLICATION_JSON)
            .body(payload);
        if (!apiKey.isBlank()) {
            requestSpec.header("Authorization", "Bearer " + apiKey);
        }
        String response = requestSpec.retrieve().body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            JsonNode content = root.path("choices").path(0).path("message").path("content");
            if (!content.isTextual() || content.asText().isBlank()) {
                throw new IllegalStateException("AI service returned an empty summary");
            }
            return content.asText().trim();
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to read AI service response", ex);
        }
    }

    private String buildContext(AiSummaryRequest request) {
        StringBuilder context = new StringBuilder("Resume ce dossier familial pour un rapport d'impact :\n");
        context.append("Famille: ").append(valueOrUnknown(request.familyName())).append('\n');
        context.append("Adresse: ").append(valueOrUnknown(request.address())).append('\n');
        context.append("Indice d'urgence: ").append(request.urgencyIndex()).append("/10\n");
        context.append("Besoins: ").append(request.needs() == null ? "Aucun renseignement" : request.needs()).append('\n');
        context.append("Visites:\n");
        if (request.visits() != null) {
            request.visits().forEach(visit -> context
                .append("- ").append(valueOrUnknown(visit.date()))
                .append(" | ").append(valueOrUnknown(visit.status()))
                .append(" | ").append(valueOrUnknown(visit.notes())).append('\n'));
        }
        return context.toString();
    }

    private String valueOrUnknown(String value) {
        return value == null || value.isBlank() ? "Non renseigne" : value;
    }
}
