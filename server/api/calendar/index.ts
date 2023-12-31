import type { DefineMethods } from 'aspida';
import type { CalendarModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: CalendarModel | null;
    query: {
      appoid: string;
    };
  };
  post: {
    reqBody: {
      appoid: CalendarModel['appoid'];
      title: CalendarModel['title'];
      startDate: CalendarModel['startDate'];
      startTime: CalendarModel['startTime'];
      endDate: CalendarModel['endDate'];
      endTime: CalendarModel['endTime'];
      details: CalendarModel['details'];
      location: CalendarModel['location'];
      createdAt: CalendarModel['createdAt'];
      group: CalendarModel['group'];
    };
  };
}>;
