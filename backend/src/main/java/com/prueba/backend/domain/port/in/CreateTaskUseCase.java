package com.prueba.backend.domain.port.in;

import com.prueba.backend.domain.model.Task;

public interface CreateTaskUseCase {
    Task execute(String title, String description);
}
