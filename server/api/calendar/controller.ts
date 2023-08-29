import { calendarUsecase } from '$/Usecase/calendarUsecase';
import { calendarRepository } from '$/repository/calenderRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await calendarRepository.findEvent(query),
  }),
  post: async ({ user, body }) => ({
    status: 200,
    body: await calendarUsecase.create(
      user?.id ?? null,
      body.appoid,
      body.title,
      body.startDate,
      body.startTime,
      body.endDate,
      body.endTime,
      body.details,
      body.location,
      body.createdAt,
      body.group
    ),
  }),
}));
