package com.prueba.backend.infrastructure.adapter.in.rest.controller;

import com.prueba.backend.domain.model.User;
import com.prueba.backend.domain.port.in.LoginUseCase;
import com.prueba.backend.domain.port.in.RegisterUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final RegisterUseCase registerUseCase;
    private final LoginUseCase loginUseCase;

    public AuthController(RegisterUseCase registerUseCase, LoginUseCase loginUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam String username, @RequestParam String password) {
        try {
            User user = registerUseCase.execute(username, password);
            return ResponseEntity.ok(new AuthResponse(user.id().toString(), user.username()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        Optional<String> userId = loginUseCase.execute(username, password);
        if (userId.isPresent()) {
            return ResponseEntity.ok(new AuthResponse(userId.get(), username));
        }
        return ResponseEntity.status(401).body(new ErrorResponse("Usuario o contraseña incorrectos"));
    }

    public record AuthResponse(String id, String username) {}
    public record ErrorResponse(String message) {}
}
