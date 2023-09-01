import type { TaskId, UserId } from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

export type CalendarModel = {
  id: UserId | undefined;
  appoid: string;
  title: string;
  details: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  createdAt: string;
  group: string[];
};
