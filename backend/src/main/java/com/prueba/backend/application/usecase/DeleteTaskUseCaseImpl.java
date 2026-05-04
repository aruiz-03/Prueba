package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.port.in.DeleteTaskUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Application service for deleting a task by ID.
 */
@Service
public class DeleteTaskUseCaseImpl implements DeleteTaskUseCase {

    private final TaskRepositoryPort taskRepository;

    public DeleteTaskUseCaseImpl(TaskRepositoryPort taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void execute(UUID id) {
        taskRepository.deleteById(id);
    }
}
