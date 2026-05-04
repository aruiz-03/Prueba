package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.GetTaskUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

/**
 * Application service for retrieving a single task by ID.
 */
@Service
public class GetTaskUseCaseImpl implements GetTaskUseCase {

    private final TaskRepositoryPort taskRepository;

    public GetTaskUseCaseImpl(TaskRepositoryPort taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Optional<Task> execute(UUID id) {
        return taskRepository.findById(id);
    }
}
