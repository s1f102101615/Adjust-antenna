import { calendarUsecase } from '$/Usecase/calendarUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post : async ({ user, body }) => ({
    status: 200, 
    body: await calendarUsecase.create(
    user.id,
    body.appoid,
    body.title,
    body.startDate,
    body.startTime,
    body.endDate,
    body.endTime,
    body.details,
    body.location,
    body.createdAt,
    ),
   }),
}));
