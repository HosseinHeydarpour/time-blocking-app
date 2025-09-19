import { FormControl } from '@angular/forms';

export interface ITask {
  id: string;
  title: string;
  duration: number;
  allDay: boolean;
  description: string;
  location: string;
}

export interface ITaskForm {
  id: FormControl<string>;
  title: FormControl<string>;
  duration: FormControl<Date>;
  allDay: FormControl<boolean>;
  description: FormControl<string>;
  location: FormControl<string>;
}
