import type { CalendarModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
export const calendarRepository = {
  save: async (calendar: CalendarModel) => {
    await prismaClient.calendar.upsert({
      where: {
        appoid: calendar.id,
      },
      update: {},
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
  // eslint-disable-next-line complexity
  findEvent: async (query: { appoid: string }) => {
    // apoidを受け取って、そのappoidのカレンダーを返す calendarModelを返す
    const calendar = await prismaClient.calendar.findUnique({
      where: {
        appoid: query.appoid,
      },
    });
    //calendarの値からCalendarModelを作成して返す
    if (calendar) {
      const calendarModel: CalendarModel = {
        id: userIdParser.parse(calendar.id),
        appoid: calendar.appoid,
        title: calendar.title ?? '',
        startDate: calendar.startDate ?? '',
        startTime: calendar.startTime ?? '',
        endDate: calendar.endDate ?? '',
        endTime: calendar.endTime ?? '',
        details: calendar.details ?? '',
        location: calendar.location ?? '',
        createdAt: calendar.createdAt.toISOString(),
      };
      return calendarModel;
    }
    return null;
  },
};
