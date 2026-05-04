package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.GetAllTasksUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetAllTasksUseCaseTest {

    @Mock
    private TaskRepositoryPort taskRepository;

    private GetAllTasksUseCase getAllTasksUseCase;

    @BeforeEach
    void setUp() {
        getAllTasksUseCase = new GetAllTasksUseCaseImpl(taskRepository);
    }

    @Test
    void shouldReturnAllTasks() {
        List<Task> expectedTasks = Arrays.asList(
                new Task(UUID.randomUUID(), "Task 1", "Desc 1", false, null),
                new Task(UUID.randomUUID(), "Task 2", "Desc 2", true, null)
        );
        when(taskRepository.findAll()).thenReturn(expectedTasks);

        List<Task> result = getAllTasksUseCase.execute();

        assertThat(result).hasSize(2);
        assertThat(result).containsExactlyElementsOf(expectedTasks);
    }

    @Test
    void shouldReturnEmptyListWhenNoTasks() {
        when(taskRepository.findAll()).thenReturn(List.of());

        List<Task> result = getAllTasksUseCase.execute();

        assertThat(result).isEmpty();
    }
}
