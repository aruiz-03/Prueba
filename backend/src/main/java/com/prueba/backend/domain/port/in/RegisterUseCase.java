package com.prueba.backend.domain.port.in;

import com.prueba.backend.domain.model.User;

public interface RegisterUseCase {
    User execute(String username, String password);
}
