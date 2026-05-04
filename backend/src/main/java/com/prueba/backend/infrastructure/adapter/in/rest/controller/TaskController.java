package com.prueba.backend.infrastructure.adapter.in.rest.controller;

import com.prueba.backend.domain.model.Task;
import com.prueba.backend.domain.port.in.CreateTaskUseCase;
import com.prueba.backend.domain.port.in.GetTaskUseCase;
import com.prueba.backend.domain.port.in.GetAllTasksUseCase;
import com.prueba.backend.domain.port.in.DeleteTaskUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST controller for Task resource.
 * All data is stored temporarily in memory (no database).
 */
@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task Management", description = "Operations for managing tasks")
public class TaskController {

    private final CreateTaskUseCase createTaskUseCase;
    private final GetTaskUseCase getTaskUseCase;
    private final GetAllTasksUseCase getAllTasksUseCase;
    private final DeleteTaskUseCase deleteTaskUseCase;

    public TaskController(CreateTaskUseCase createTaskUseCase, GetTaskUseCase getTaskUseCase,
                         GetAllTasksUseCase getAllTasksUseCase, DeleteTaskUseCase deleteTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
        this.getTaskUseCase = getTaskUseCase;
        this.getAllTasksUseCase = getAllTasksUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
    }

    @PostMapping
    @Operation(summary = "Create a new task", description = "Creates a new task with the provided title and description")
    @ApiResponse(responseCode = "200", description = "Task created successfully")
    public ResponseEntity<Task> createTask(
            @Parameter(description = "Title of the task", required = true) @RequestParam String title,
            @Parameter(description = "Description of the task", required = true) @RequestParam String description) {
        Task task = createTaskUseCase.execute(title, description);
        return ResponseEntity.ok(task);
    }

    @GetMapping
    @Operation(summary = "Get all tasks", description = "Retrieves all tasks from in-memory storage")
    @ApiResponse(responseCode = "200", description = "List of tasks retrieved successfully")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = getAllTasksUseCase.execute();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get task by ID", description = "Retrieves a specific task by its UUID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Task found"),
        @ApiResponse(responseCode = "404", description = "Task not found")
    })
    public ResponseEntity<Task> getTaskById(
            @Parameter(description = "UUID of the task", required = true) @PathVariable UUID id) {
        return getTaskUseCase.execute(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task by ID", description = "Deletes a task by its UUID")
    @ApiResponse(responseCode = "204", description = "Task deleted successfully")
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "UUID of the task to delete", required = true) @PathVariable UUID id) {
        deleteTaskUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
