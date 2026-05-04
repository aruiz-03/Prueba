package com.prueba.backend.domain.port.in;

import com.prueba.backend.domain.model.Task;
import java.util.Optional;
import java.util.UUID;

public interface GetTaskUseCase {
    Optional<Task> execute(UUID id);
}
