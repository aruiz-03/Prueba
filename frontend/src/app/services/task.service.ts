import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly API_URL = 'http://localhost:8080/api/tasks';
  private tasksSignal = signal<Task[]>([]);

  tasks = computed(() => this.tasksSignal());

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.http.get<Task[]>(this.API_URL).subscribe({
      next: (tasks) => this.tasksSignal.set(tasks),
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  addTask(title: string, description: string): void {
    this.http.post<Task>(this.API_URL, null, {
      params: { title, description }
    }).pipe(
      tap(task => this.tasksSignal.update(tasks => [...tasks, task]))
    ).subscribe({
      error: (err) => console.error('Error creating task:', err)
    });
  }

  toggleTask(id: string): void {
    // Note: Backend doesn't have toggle endpoint yet
    console.warn('Toggle not implemented in backend');
  }

  deleteTask(id: string): void {
    this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id)))
    ).subscribe({
      error: (err) => console.error('Error deleting task:', err)
    });
  }
}
