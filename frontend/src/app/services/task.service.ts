import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY = 'tasks';
  private tasksSignal = signal<Task[]>(this.loadTasks());

  tasks = computed(() => this.tasksSignal());

  private loadTasks(): Task[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      }));
    }
    return [];
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSignal.set(tasks);
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date()
    };
    const updated = [...this.tasksSignal(), newTask];
    this.saveTasks(updated);
  }

  toggleTask(id: string): void {
    const updated = this.tasksSignal().map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks(updated);
  }

  deleteTask(id: string): void {
    const updated = this.tasksSignal().filter(task => task.id !== id);
    this.saveTasks(updated);
  }
}
