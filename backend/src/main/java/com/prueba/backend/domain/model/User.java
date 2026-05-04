package com.prueba.backend.domain.model;

import java.util.UUID;

/**
 * Domain entity representing a User.
 */
public record User(
    UUID id,
    String username,
    String passwordHash
) {
    public static User create(String username, String passwordHash) {
        return new User(
            UUID.randomUUID(),
            username,
            passwordHash
        );
    }
}
