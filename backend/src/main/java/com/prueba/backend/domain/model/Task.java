package com.prueba.backend.domain.model;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a Task.
 * This record is used directly in the in-memory repository (no JPA annotations needed).
 */
public record Task(
    UUID id,
    String title,
    String description,
    boolean completed,
    LocalDateTime createdAt
) {
    public static Task create(String title, String description) {
        return new Task(
            UUID.randomUUID(),
            title,
            description,
            false,
            LocalDateTime.now()
        );
    }
}
