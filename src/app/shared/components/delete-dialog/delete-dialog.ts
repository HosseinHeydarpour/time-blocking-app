import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from '../../../core/services/dialog-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../../core/services/settings-service';
import { Subscription } from 'rxjs';
import { TaskService } from '../../../core/services/task-service';

@Component({
  selector: 'app-delete-dialog',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DatePickerModule,
    CommonModule,
  ],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog implements OnDestroy {
  visible: boolean = false;
  dialogService = inject(DialogService);
  subscriptions = new Subscription();
  tasksService = inject(TaskService);
  constructor() {
    this.subscriptions.add(
      this.dialogService.visible$.subscribe((visible) => {
        console.log(visible);
        if (visible.type === 'delete' || visible.type === null) {
          this.visible = visible.isVisible;
          console.log(this.visible);
        }
      })
    );
  }

  onDeleteClicked() {
    this.tasksService.deleteAll();
    this.dialogService.closeDialog();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
