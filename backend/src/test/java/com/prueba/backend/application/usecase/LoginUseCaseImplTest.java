package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.User;
import com.prueba.backend.domain.port.in.LoginUseCase;
import com.prueba.backend.domain.port.out.UserRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginUseCaseImplTest {

    @Mock
    private UserRepositoryPort userRepository;

    private LoginUseCase loginUseCase;

    @BeforeEach
    void setUp() {
        loginUseCase = new LoginUseCaseImpl(userRepository);
    }

    @Test
    void shouldReturnUserIdWhenCredentialsAreValid() {
        String username = "testuser";
        String password = "correctpass";
        User user = User.create(username, password);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        Optional<String> result = loginUseCase.execute(username, password);

        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(user.id().toString());
    }

    @Test
    void shouldReturnEmptyWhenPasswordIsIncorrect() {
        String username = "testuser";
        String correctPassword = "correctpass";
        String wrongPassword = "wrongpass";
        User user = User.create(username, correctPassword);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        Optional<String> result = loginUseCase.execute(username, wrongPassword);

        assertThat(result).isEmpty();
    }

    @Test
    void shouldReturnEmptyWhenUserDoesNotExist() {
        String username = "nonexistent";
        String password = "password";
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        Optional<String> result = loginUseCase.execute(username, password);

        assertThat(result).isEmpty();
    }
}
