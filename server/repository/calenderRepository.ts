/* eslint-disable complexity */
import type { CalendarModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
export const calendarRepository = {
  save: async (calendar: CalendarModel) => {
    await prismaClient.calendar.upsert({
      where: {
        appoid: calendar.appoid,
      },
      update: { group: calendar.group },
      create: {
        id: calendar.id !== null ? calendar.id : '',
        appoid: calendar.appoid,
        title: calendar.title,
        startDate: calendar.startDate,
        startTime: calendar.startTime,
        endDate: calendar.endDate,
        endTime: calendar.endTime,
        details: calendar.details,
        location: calendar.location,
        createdAt: calendar.createdAt,
        group: [],
      },
    });
  },
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
        id: calendar.id ? userIdParser.parse(calendar.id) : userIdParser.parse(''),
        appoid: calendar.appoid,
        title: calendar.title ?? '',
        startDate: calendar.startDate ?? '',
        startTime: calendar.startTime ?? '',
        endDate: calendar.endDate ?? '',
        endTime: calendar.endTime ?? '',
        details: calendar.details ?? '',
        location: calendar.location ?? '',
        createdAt: calendar.createdAt.toISOString(),
        group: calendar.group ?? [],
      };
      return calendarModel;
    }
    return null;
  },
};
