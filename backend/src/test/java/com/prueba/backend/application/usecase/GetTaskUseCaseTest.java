package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.GetTaskUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetTaskUseCaseTest {

    @Mock
    private TaskRepositoryPort taskRepository;

    private GetTaskUseCase getTaskUseCase;

    @BeforeEach
    void setUp() {
        getTaskUseCase = new GetTaskUseCaseImpl(taskRepository);
    }

    @Test
    void shouldReturnTaskWhenExists() {
        UUID id = UUID.randomUUID();
        Task expectedTask = new Task(id, "Task", "Desc", false, null);
        when(taskRepository.findById(id)).thenReturn(Optional.of(expectedTask));

        Optional<Task> result = getTaskUseCase.execute(id);

        assertThat(result).isPresent();
        assertThat(result.get().id()).isEqualTo(id);
    }

    @Test
    void shouldReturnEmptyWhenTaskNotExists() {
        UUID id = UUID.randomUUID();
        when(taskRepository.findById(id)).thenReturn(Optional.empty());

        Optional<Task> result = getTaskUseCase.execute(id);

        assertThat(result).isEmpty();
    }
}
