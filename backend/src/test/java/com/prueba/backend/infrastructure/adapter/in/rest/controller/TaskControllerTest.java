package com.prueba.backend.infrastructure.adapter.in.rest.controller;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.CreateTaskUseCase;
import com.prueba.backend.domain.port.in.GetTaskUseCase;
import com.prueba.backend.domain.port.in.GetAllTasksUseCase;
import com.prueba.backend.domain.port.in.DeleteTaskUseCase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskControllerTest {

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
    void shouldCreateTaskAndReturnOkResponse() {
        String title = "Test Task";
        String description = "Test Description";
        Task createdTask = new Task(UUID.randomUUID(), title, description, false, null);
        when(createTaskUseCase.execute(anyString(), anyString())).thenReturn(createdTask);

        ResponseEntity<Task> response = taskController.createTask(title, description);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().title()).isEqualTo(title);
    }

    @Test
    void shouldCallCreateTaskUseCaseWithCorrectParameters() {
        String title = "My Task";
        String description = "My Description";
        Task createdTask = new Task(UUID.randomUUID(), title, description, false, null);
        when(createTaskUseCase.execute(anyString(), anyString())).thenReturn(createdTask);

        taskController.createTask(title, description);

        verify(createTaskUseCase).execute(title, description);
    }

    @Test
    void shouldReturnCreatedTaskInResponseBody() {
        UUID id = UUID.randomUUID();
        String title = "Specific Task";
        String description = "Specific Description";
        Task createdTask = new Task(id, title, description, false, null);
        when(createTaskUseCase.execute(anyString(), anyString())).thenReturn(createdTask);

        ResponseEntity<Task> response = taskController.createTask(title, description);

        assertThat(response.getBody().id()).isEqualTo(id);
        assertThat(response.getBody().title()).isEqualTo(title);
        assertThat(response.getBody().description()).isEqualTo(description);
        assertThat(response.getBody().completed()).isFalse();
    }
}
