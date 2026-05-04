package com.prueba.backend.infrastructure.adapter.out.persistence.repository;

import com.prueba.backend.domain.model.User;
import com.prueba.backend.domain.port.out.UserRepositoryPort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class InMemoryUserRepository implements UserRepositoryPort {

    private final List<User> users = new ArrayList<>();

    @Override
    public Optional<User> findById(UUID id) {
        return users.stream().filter(u -> u.id().equals(id)).findFirst();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return users.stream().filter(u -> u.username().equals(username)).findFirst();
    }

    @Override
    public User save(User user) {
        users.add(user);
        return user;
    }

    @Override
    public void deleteById(UUID id) {
        users.removeIf(u -> u.id().equals(id));
    }
}
