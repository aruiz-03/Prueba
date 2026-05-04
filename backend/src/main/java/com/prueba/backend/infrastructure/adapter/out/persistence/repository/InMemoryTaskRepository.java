package com.prueba.backend.infrastructure.adapter.out.persistence.repository;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.out.TaskRepositoryPort;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory implementation of TaskRepositoryPort.
 * Data is stored temporarily and will be lost on application restart.
 * No database required.
 */
@Repository
public class InMemoryTaskRepository implements TaskRepositoryPort {

    private final Map<UUID, Task> tasks = new ConcurrentHashMap<>();

    @Override
    public Optional<Task> findById(UUID id) {
        return Optional.ofNullable(tasks.get(id));
    }

    @Override
    public List<Task> findAll() {
        return new ArrayList<>(tasks.values());
    }

    @Override
    public Task save(Task task) {
        tasks.put(task.id(), task);
        return task;
    }

    @Override
    public void deleteById(UUID id) {
        tasks.remove(id);
    }
}
