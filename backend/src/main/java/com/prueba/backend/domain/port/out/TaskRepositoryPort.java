package com.prueba.backend.domain.port.out;

import com.prueba.backend.domain.model.Task;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepositoryPort {
    Optional<Task> findById(UUID id);
    List<Task> findAll();
    Task save(Task task);
    void deleteById(UUID id);
}
