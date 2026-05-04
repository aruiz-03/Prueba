package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.DeleteTaskUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class DeleteTaskUseCaseTest {

    @Mock
    private TaskRepositoryPort taskRepository;

    private DeleteTaskUseCase deleteTaskUseCase;

    @BeforeEach
    void setUp() {
        deleteTaskUseCase = new DeleteTaskUseCaseImpl(taskRepository);
    }

    @Test
    void shouldDeleteTaskById() {
        UUID id = UUID.randomUUID();

        deleteTaskUseCase.execute(id);

        verify(taskRepository).deleteById(id);
    }
}
