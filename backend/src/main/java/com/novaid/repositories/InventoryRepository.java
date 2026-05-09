package com.novaid.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novaid.models.Item;

public interface InventoryRepository extends JpaRepository<Item, Long> {
}
