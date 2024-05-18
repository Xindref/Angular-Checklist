import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ FormsModule, NgIf ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().
      subscribe((value) => (this.showAddTask = value))
  }

  onSubmit(): void {
        if (!this.text) {
          alert("Please add a task!");
          return;
        }

        const newTask: Task = {
          text: this.text,
          day: this.day,
          reminder: this.reminder
        }

        this.onAddTask.emit(newTask);

        this.text = "";
        this.day = "";
        this.reminder = false;
    }
}
