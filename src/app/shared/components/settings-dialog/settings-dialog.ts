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
export class SettingsDialog implements OnDestroy, OnInit {
  visible: boolean = false;
  dialogService = inject(DialogService);
  subscriptions = new Subscription();
  settingsService = inject(SettingsService);

  settingsForm = new FormGroup({
    timeBlockDuration: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    focusDurationGoal: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    startAt: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    endAt: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    this.subscriptions.add(
      this.dialogService.visible$.subscribe((visible) => {
        if (visible.type === 'settings') {
          this.visible = visible.isVisible;
        }
      })
    );
  }

  ngOnInit(): void {
    const settings = this.settingsService.fetchSettings();
    if (settings) {
      this.settingsForm.patchValue(settings);
    }
  }

  onSubmit() {
    if (this.settingsForm.invalid) return;

    const formValue = { ...this.settingsForm.value };

    const startAtValue = formValue.startAt;
    const endAtValue = formValue.endAt;

    if (startAtValue && endAtValue) {
      formValue.startAt = this.formatTimeString(startAtValue);
      formValue.endAt = this.formatTimeString(endAtValue);
    }

    this.settingsService.saveSettings(formValue);
    this.dialogService.closeDialog();
  }

  private formatTimeString(time: Date | string): string {
    if (typeof time === 'string') return time;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
