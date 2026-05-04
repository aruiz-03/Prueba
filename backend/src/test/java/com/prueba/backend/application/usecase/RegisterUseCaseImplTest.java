package com.prueba.backend.application.usecase;

import com.prueba.backend.domain.model.User;
import com.prueba.backend.domain.port.in.RegisterUseCase;
import com.prueba.backend.domain.port.out.UserRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RegisterUseCaseImplTest {

    @Mock
    private UserRepositoryPort userRepository;

    private RegisterUseCase registerUseCase;

    @BeforeEach
    void setUp() {
        registerUseCase = new RegisterUseCaseImpl(userRepository);
    }

    @Test
    void shouldRegisterUserSuccessfully() {
        String username = "newuser";
        String password = "password123";
        User savedUser = User.create(username, password);
        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        User result = registerUseCase.execute(username, password);

        assertThat(result.username()).isEqualTo(username);
        assertThat(result.passwordHash()).isEqualTo(password);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldThrowExceptionWhenUsernameAlreadyExists() {
        String username = "existinguser";
        String password = "password123";
        User existingUser = User.create(username, password);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(existingUser));

        assertThatThrownBy(() -> registerUseCase.execute(username, password))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("El usuario ya existe");
    }
}
