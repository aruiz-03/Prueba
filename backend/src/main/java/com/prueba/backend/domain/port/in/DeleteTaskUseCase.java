package com.prueba.backend.domain.port.in;

import java.util.UUID;

public interface DeleteTaskUseCase {
    void execute(UUID id);
}
