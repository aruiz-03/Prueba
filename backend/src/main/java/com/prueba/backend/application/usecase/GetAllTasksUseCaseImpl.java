package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.GetAllTasksUseCase;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Application service for retrieving all tasks.
 */
@Service
public class GetAllTasksUseCaseImpl implements GetAllTasksUseCase {

    private final TaskRepositoryPort taskRepository;

    public GetAllTasksUseCaseImpl(TaskRepositoryPort taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> execute() {
        return taskRepository.findAll();
    }
}
