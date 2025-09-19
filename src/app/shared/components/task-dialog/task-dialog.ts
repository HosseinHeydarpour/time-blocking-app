import { Component, computed, effect, inject, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from '../../../core/services/dialog-service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { ITaskForm } from '../../../core/models/task.model';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task-service';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../core/services/settings-service';

@Component({
  selector: 'app-task-dialog',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DatePickerModule,
    CommonModule,
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  dialogService = inject(DialogService);
  tasksService = inject(TaskService);
  visible: boolean = false;
  taskForm: FormGroup<ITaskForm>;
  subscriptions = new Subscription();
  settingsService = inject(SettingsService);
  settings: any;
  step!: number;

  constructor() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    this.settings = this.settingsService.fetchSettings();
    this.step = this.settings.timeBlockDuration * 1;
    this.taskForm = new FormGroup<ITaskForm>({
      title: new FormControl('', { nonNullable: true, validators: Validators.required }),
      duration: new FormControl(now, {
        nonNullable: true,
        validators: [Validators.required, this.minutesMultipleOfStepValidator(this.step)],
      }),
      description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    });
    this.dialogService.visible$.subscribe((visible) => {
      if (visible.type === 'task' || visible.type === null) {
        this.visible = visible.isVisible;
      }
    });

    this.subscriptions.add(
      this.settingsService.settings$.subscribe((settings) => {
        this.settings = settings;
        this.step = this.settings.timeBlockDuration * 1;

        const durationControl = this.taskForm.get('duration');
        if (durationControl) {
          durationControl.setValidators([this.minutesMultipleOfStepValidator(this.step)]);
          durationControl.updateValueAndValidity();
        }
      })
    );
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    this.tasksService.addTask({
      id: this.tasksService.tasks().length + 1 + '',
      title: this.taskForm.value.title as string,
      duration: this.taskForm.value.duration as Date,
      description: this.taskForm.value.description as string,
    });
    this.dialogService.closeDialog();
  }

  minutesMultipleOfStepValidator(step: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: Date = control.value;
      if (!value) return null;

      const minutes = value.getMinutes();
      return minutes % step === 0 ? null : { notMultipleOfStep: true };
    };
  }
}
