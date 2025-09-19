export interface IEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description: string;
  location: string;
}
