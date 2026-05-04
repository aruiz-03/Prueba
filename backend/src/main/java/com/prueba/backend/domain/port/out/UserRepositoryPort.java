package com.prueba.backend.domain.port.out;

import com.prueba.backend.domain.model.User;
import java.util.Optional;
import java.util.UUID;

public interface UserRepositoryPort {
    Optional<User> findById(UUID id);
    Optional<User> findByUsername(String username);
    User save(User user);
    void deleteById(UUID id);
}
