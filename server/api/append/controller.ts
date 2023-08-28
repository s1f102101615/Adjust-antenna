import { appendRepository } from '$/repository/appendRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({ status: 200, body: await appendRepository.getevents(user.id) }),
  post: async ({ user, body }) => ({
    status: 200,
    body: await appendRepository.save(user.id, body.appoid),
  }),
}));
