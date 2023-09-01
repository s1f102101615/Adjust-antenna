import type { UserModel } from '$/commonTypesWithClient/models';
import { getUserModel } from '$/middleware/firebaseAdmin';
import { userIdParser } from '$/service/idParsers';
import { defineHooks } from './$relay';

export type AdditionalRequest = {
  user: UserModel;
};

export default defineHooks(() => ({
  preHandler: async (req) => {
    const user = await getUserModel(req.cookies.session);

    if (!user) {
      req.user = undefined;
      return;
    }

    req.user = {
      id: userIdParser.parse(user.uid),
      email: user.email ?? '',
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  },
}));
