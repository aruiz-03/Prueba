package com.prueba.backend.infrastructure.adapter.in.rest.controller;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.CreateTaskUseCase;
import com.prueba.backend.domain.port.in.GetAllTasksUseCase;
import com.prueba.backend.domain.port.in.GetTaskUseCase;
import com.prueba.backend.domain.port.in.DeleteTaskUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskControllerExtendedTest {

    @Mock
    private CreateTaskUseCase createTaskUseCase;

    @Mock
    private GetTaskUseCase getTaskUseCase;

    @Mock
    private GetAllTasksUseCase getAllTasksUseCase;

    @Mock
    private DeleteTaskUseCase deleteTaskUseCase;

    private TaskController taskController;

    @BeforeEach
    void setUp() {
        taskController = new TaskController(createTaskUseCase, getTaskUseCase, getAllTasksUseCase, deleteTaskUseCase);
    }

    @Test
    void shouldReturnAllTasks() {
        List<Task> expectedTasks = Arrays.asList(
                new Task(UUID.randomUUID(), "Task 1", "Desc 1", false, null),
                new Task(UUID.randomUUID(), "Task 2", "Desc 2", true, null)
        );
        when(getAllTasksUseCase.execute()).thenReturn(expectedTasks);

        ResponseEntity<List<Task>> response = taskController.getAllTasks();

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        assertThat(response.getBody()).hasSize(2);
    }

    @Test
    void shouldReturnTaskByIdWhenExists() {
        UUID id = UUID.randomUUID();
        Task expectedTask = new Task(id, "Task", "Desc", false, null);
        when(getTaskUseCase.execute(id)).thenReturn(Optional.of(expectedTask));

        ResponseEntity<Task> response = taskController.getTaskById(id);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        assertThat(response.getBody().id()).isEqualTo(id);
    }

    @Test
    void shouldReturn404WhenTaskNotExists() {
        UUID id = UUID.randomUUID();
        when(getTaskUseCase.execute(id)).thenReturn(Optional.empty());

        ResponseEntity<Task> response = taskController.getTaskById(id);

        assertThat(response.getStatusCode().value()).isEqualTo(404);
    }

    @Test
    void shouldDeleteTaskAndReturn204() {
        UUID id = UUID.randomUUID();

        ResponseEntity<Void> response = taskController.deleteTask(id);

        assertThat(response.getStatusCode().value()).isEqualTo(204);
    }
}
