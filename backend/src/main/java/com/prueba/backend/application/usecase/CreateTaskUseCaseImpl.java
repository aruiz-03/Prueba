package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.CreateTaskUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.springframework.stereotype.Service;

/**
 * Application service implementing the CreateTaskUseCase.
 * Orchestrates task creation using the domain model and repository port.
 */
@Service
public class CreateTaskUseCaseImpl implements CreateTaskUseCase {

    private final TaskRepositoryPort taskRepository;

    public CreateTaskUseCaseImpl(TaskRepositoryPort taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task execute(String title, String description) {
        Task task = Task.create(title, description);
        return taskRepository.save(task);
    }
}
