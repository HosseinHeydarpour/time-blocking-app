import { FormControl } from '@angular/forms';

export interface ITask {
  id: string;
  title: string;
  duration: Date;

  description: string;
}

export interface ITaskForm {
  id: FormControl<string>;
  title: FormControl<string>;
  duration: FormControl<Date>;

  description: FormControl<string>;
}
