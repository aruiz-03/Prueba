package com.prueba.backend.domain.model;

import org.junit.jupiter.api.Test;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {

    @Test
    void shouldCreateUserWithIdAndUsername() {
        UUID id = UUID.randomUUID();
        String username = "testuser";
        String passwordHash = "hashedPassword";

        User user = new User(id, username, passwordHash);

        assertThat(user.id()).isEqualTo(id);
        assertThat(user.username()).isEqualTo(username);
        assertThat(user.passwordHash()).isEqualTo(passwordHash);
    }

    @Test
    void shouldCreateUserWithGeneratedId() {
        String username = "newuser";
        String passwordHash = "hashedPass";

        User user = User.create(username, passwordHash);

        assertThat(user.id()).isNotNull();
        assertThat(user.username()).isEqualTo(username);
        assertThat(user.passwordHash()).isEqualTo(passwordHash);
    }

    @Test
    void shouldCreateDifferentIdsForDifferentUsers() {
        User user1 = User.create("user1", "pass1");
        User user2 = User.create("user2", "pass2");

        assertThat(user1.id()).isNotEqualTo(user2.id());
    }
}
