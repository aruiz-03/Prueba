import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { TaskFormComponent } from '../../molecules/task-form/task-form';
import { TaskListComponent } from '../../organisms/task-list/task-list';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent, ButtonComponent],
  template: `
    <div class="home">
      <header class="home-header">
        <div class="header-content">
          <div class="header-title">
            <h1>📋 Mis Tareas</h1>
            <span class="task-count">{{ taskService.tasks().length }} tareas</span>
          </div>
          <div class="user-info">
            @if (authService.currentUser()) {
              <div class="user-avatar">
                {{ authService.currentUser()?.username ? authService.currentUser()!.username.charAt(0).toUpperCase() : '' }}
              </div>
              <span class="username">{{ authService.currentUser()?.username }}</span>
            }
            <app-button variant="secondary" (click)="logout()">Cerrar Sesión</app-button>
          </div>
        </div>
      </header>
      <main class="home-content">
        <app-task-form (taskAdded)="taskService.addTask($event)" />
        <app-task-list
          [tasks]="taskService.tasks()"
          (toggle)="taskService.toggleTask($event)"
          (delete)="taskService.deleteTask($event)"
        />
      </main>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
      background: var(--background);
    }
    .home-header {
      background: var(--surface);
      border-bottom:1px solid var(--border);
      box-shadow: var(--shadow);
      position: sticky;
      top:0;
      z-index: 10;
    }
    .header-content {
      max-width: 800px;
      margin:0 auto;
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-title {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin:0;
    }
    .task-count {
      background: var(--primary);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-avatar {
      width: 36px;
      height: 36px;
      background: var(--primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
    .username {
      font-weight: 500;
      color: var(--text-primary);
    }
    .home-content {
      max-width: 800px;
      margin:0 auto;
      padding: 32px 20px;
    }
    @media (max-width: 640px) {
      .header-content {
        flex-direction: column;
        gap: 12px;
      }
      .user-info {
        width:100%;
        justify-content: center;
      }
    }
  `]
})
export class HomeComponent {
  taskService = inject(TaskService);
  authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
