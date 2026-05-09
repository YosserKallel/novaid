package com.novaid.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

import com.novaid.dto.ItemRequest;
import com.novaid.dto.ItemResponse;
import com.novaid.models.Item;
import com.novaid.repositories.InventoryRepository;

@RestController
@RequestMapping("/api/items")
public class InventoryController {
    private final InventoryRepository inventoryRepository;

    public InventoryController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @GetMapping
    public List<ItemResponse> getAllItems() {
        return inventoryRepository.findAll().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ItemResponse getItem(@PathVariable Long id) {
        Item item = inventoryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        return toResponse(item);
    }

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(@Valid @RequestBody ItemRequest request) {
        Item item = new Item();
        applyRequest(item, request);
        Item saved = inventoryRepository.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    @PutMapping("/{id}")
    public ItemResponse updateItem(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        Item item = inventoryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        applyRequest(item, request);
        Item saved = inventoryRepository.save(item);
        return toResponse(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        Item item = inventoryRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        inventoryRepository.delete(item);
        return ResponseEntity.noContent().build();
    }

    private ItemResponse toResponse(Item item) {
        ItemResponse response = new ItemResponse();
        response.setId(item.getId());
        response.setName(item.getName());
        response.setCategory(item.getCategory());
        response.setQuantity(item.getQuantity());
        response.setUnit(item.getUnit());
        response.setMinThreshold(item.getMinThreshold());
        return response;
    }

    private void applyRequest(Item item, ItemRequest request) {
        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setQuantity(request.getQuantity());
        item.setUnit(request.getUnit());
        item.setMinThreshold(request.getMinThreshold());
    }
}
