package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.CreateTaskUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateTaskUseCaseTest {

    @Mock
    private TaskRepositoryPort taskRepository;

    private CreateTaskUseCase createTaskUseCase;

    @BeforeEach
    void setUp() {
        createTaskUseCase = new CreateTaskUseCaseImpl(taskRepository);
    }

    @Test
    void shouldCreateTaskWithTitleAndDescription() {
        String title = "New Task";
        String description = "Task Description";
        Task savedTask = new Task(UUID.randomUUID(), title, description, false, null);
        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        Task result = createTaskUseCase.execute(title, description);

        assertThat(result.title()).isEqualTo(title);
        assertThat(result.description()).isEqualTo(description);
    }

    @Test
    void shouldGenerateUniqueIdForEachTask() {
        Task task1 = new Task(UUID.randomUUID(), "Task 1", "Desc 1", false, null);
        Task task2 = new Task(UUID.randomUUID(), "Task 2", "Desc 2", false, null);
        when(taskRepository.save(any(Task.class)))
                .thenReturn(task1)
                .thenReturn(task2);

        Task result1 = createTaskUseCase.execute("Task 1", "Desc 1");
        Task result2 = createTaskUseCase.execute("Task 2", "Desc 2");

        assertThat(result1.id()).isNotEqualTo(result2.id());
    }

    @Test
    void shouldSaveTaskToRepository() {
        String title = "Test Task";
        String description = "Test Description";
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        createTaskUseCase.execute(title, description);

        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void shouldCreateTaskAsNotCompleted() {
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Task result = createTaskUseCase.execute("Task", "Description");

        assertThat(result.completed()).isFalse();
    }
}
