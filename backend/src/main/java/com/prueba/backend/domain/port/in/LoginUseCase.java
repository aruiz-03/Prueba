package com.prueba.backend.domain.port.in;

import java.util.Optional;

public interface LoginUseCase {
    Optional<String> execute(String username, String password);
}
