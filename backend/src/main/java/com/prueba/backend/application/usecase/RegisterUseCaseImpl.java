package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.User;
import com.prueba.backend.domain.port.in.RegisterUseCase;
import com.prueba.backend.domain.port.out.UserRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class RegisterUseCaseImpl implements RegisterUseCase {

    private final UserRepositoryPort userRepository;

    public RegisterUseCaseImpl(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User execute(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("El usuario ya existe");
        }
        User user = User.create(username, password);
        return userRepository.save(user);
    }
}
