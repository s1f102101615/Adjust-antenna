import { appendRepository } from '$/repository/appendRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ user, body }) => ({
    status: 200,
    body: await appendRepository.save(
      user.id,
      body.appoid,
    ),
  }),
}));
