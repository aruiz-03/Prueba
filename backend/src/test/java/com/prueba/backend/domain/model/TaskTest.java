package com.prueba.backend.domain.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class TaskTest {

    @Test
    void shouldCreateTaskWithGeneratedId() {
        Task task = Task.create("Test Task", "Test Description");

        assertThat(task.id()).isNotNull();
        assertThat(task.id()).isInstanceOf(UUID.class);
    }

    @Test
    void shouldCreateTaskWithCorrectTitleAndDescription() {
        String title = "Test Task";
        String description = "Test Description";

        Task task = Task.create(title, description);

        assertThat(task.title()).isEqualTo(title);
        assertThat(task.description()).isEqualTo(description);
    }

    @Test
    void shouldCreateTaskAsNotCompletedByDefault() {
        Task task = Task.create("Test Task", "Test Description");

        assertThat(task.completed()).isFalse();
    }

    @Test
    void shouldCreateTaskWithCreationTimestamp() {
        Task task = Task.create("Test Task", "Test Description");

        assertThat(task.createdAt()).isNotNull();
        assertThat(task.createdAt()).isBeforeOrEqualTo(LocalDateTime.now());
    }

    @Test
    void shouldCreateTaskWithSpecificValues() {
        UUID id = UUID.randomUUID();
        String title = "Specific Task";
        String description = "Specific Description";
        boolean completed = true;
        LocalDateTime createdAt = LocalDateTime.now().minusHours(1);

        Task task = new Task(id, title, description, completed, createdAt);

        assertThat(task.id()).isEqualTo(id);
        assertThat(task.title()).isEqualTo(title);
        assertThat(task.description()).isEqualTo(description);
        assertThat(task.completed()).isEqualTo(completed);
        assertThat(task.createdAt()).isEqualTo(createdAt);
    }
}
