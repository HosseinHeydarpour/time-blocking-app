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
    timeBlockDuration: new FormControl('', [Validators.required]),
    focusDurationGoal: new FormControl('', [Validators.required]),
    startAt: new FormControl('', [Validators.required]),
    endAt: new FormControl('', [Validators.required]),
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
    console.log('submit', this.settingsForm.value);

    this.settingsService.saveSettings(this.settingsForm.value);
    this.dialogService.closeDialog();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
