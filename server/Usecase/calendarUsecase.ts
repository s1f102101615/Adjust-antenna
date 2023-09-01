import type { CalendarModel } from '$/commonTypesWithClient/models';
import { calendarRepository } from '$/repository/calenderRepository';

export const calendarUsecase = {
  create: async (
    id: CalendarModel['id'] | undefined,
    appoid: CalendarModel['appoid'],
    title: CalendarModel['title'],
    startDate: CalendarModel['startDate'],
    startTime: CalendarModel['startTime'],
    endDate: CalendarModel['endDate'],
    endTime: CalendarModel['endTime'],
    details: CalendarModel['details'],
    location: CalendarModel['location'],
    createdAt: CalendarModel['createdAt'],
    group: CalendarModel['group']
  ) => {
    const calendar: CalendarModel = {
      id,
      appoid,
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      details,
      location,
      createdAt,
      group,
    };
    await calendarRepository.save(calendar);

    return 'ok';
  },
};
