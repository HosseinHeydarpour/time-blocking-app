import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
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
import { SettingsService } from '../../../core/services/settings-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-dialog',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DatePickerModule,
    CommonModule,
  ],
  templateUrl: './settings-dialog.html',
  styleUrl: './settings-dialog.scss',
})
export class SettingsDialog implements OnDestroy {
  visible: boolean = false;
  settingsService = inject(SettingsService);
  subscriptions = new Subscription();

  settingsForm = new FormGroup({
    timeBlockDuration: new FormControl('', [Validators.required]),
    focusDurationGoal: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.subscriptions.add(
      this.settingsService.visible$.subscribe((visible) => {
        this.visible = visible;
      })
    );
  }

  onSubmit() {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
