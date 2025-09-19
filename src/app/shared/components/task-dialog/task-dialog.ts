import { Component, computed, inject } from '@angular/core';
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
import { title } from 'process';
import { ITaskForm } from '../../../core/models/task.model';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';

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
  visible = computed(() => this.dialogService.visible());
  taskForm: FormGroup<ITaskForm>;

  constructor() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    this.taskForm = new FormGroup<ITaskForm>({
      id: new FormControl('', { nonNullable: true }),
      title: new FormControl('', { nonNullable: true, validators: Validators.required }),
      duration: new FormControl(now, {
        nonNullable: true,
        validators: [Validators.required, this.minutesMultipleOf5Validator],
      }),
      allDay: new FormControl(false, { nonNullable: true }),
      description: new FormControl('', { nonNullable: true, validators: Validators.required }),
      location: new FormControl('', { nonNullable: true, validators: Validators.required }),
    });
  }

  onSubmit() {}

  minutesMultipleOf5Validator(control: AbstractControl): ValidationErrors | null {
    const value: Date = control.value;
    if (!value) return null;

    const minutes = value.getMinutes();
    return minutes % 5 === 0 ? null : { notMultipleOf5: true };
  }
}
