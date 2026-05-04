package com.prueba.backend.domain.port.in;

import com.prueba.backend.domain.model.Task;
import java.util.List;

public interface GetAllTasksUseCase {
    List<Task> execute();
}
