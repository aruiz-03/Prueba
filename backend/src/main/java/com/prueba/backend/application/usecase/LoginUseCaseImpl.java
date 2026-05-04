package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.User;
import com.prueba.backend.domain.port.in.LoginUseCase;
import com.prueba.backend.domain.port.out.UserRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginUseCaseImpl implements LoginUseCase {

    private final UserRepositoryPort userRepository;

    public LoginUseCaseImpl(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<String> execute(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.passwordHash().equals(password))
                .map(user -> user.id().toString());
    }
}
