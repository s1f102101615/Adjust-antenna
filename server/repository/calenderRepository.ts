import { prismaClient } from '$/service/prismaClient';
import type { CalendarModel } from '$/commonTypesWithClient/models';
export const calendarRepository = {
  save: async ( calendar: CalendarModel ) => {
    await prismaClient.calendar.upsert({
      where: {
        appoid: calendar.id,
      },
      update: {
      },  
      create: {
      id: calendar.id,
      appoid: calendar.appoid,
      title: calendar.title,
      startDate: calendar.startDate,
      startTime: calendar.startTime,
      endDate: calendar.endDate,
      endTime: calendar.endTime,
      details: calendar.details,
      location: calendar.location,
      createdAt: calendar.createdAt,
      },
    });
  },
};