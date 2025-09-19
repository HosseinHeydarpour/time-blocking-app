import { Component, computed, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from '../../../core/services/dialog-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { ITaskForm } from '../../../core/models/event.model';

@Component({
  selector: 'app-task-dialog',
  imports: [Dialog, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  dialogService = inject(DialogService);
  visible = computed(() => this.dialogService.visible());

  taskForm = new FormGroup<ITaskForm>({
    id: new FormControl('', { nonNullable: true }),
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    duration: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    allDay: new FormControl(false, { nonNullable: true }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    location: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  onSubmit() {}
}
