import type { UserId } from '$/commonTypesWithClient/branded';
import { prismaClient } from '$/service/prismaClient';

export const appendRepository = {
  getevents: async (userid: UserId) => {
    // dbのUserDataのinvolvedidのリストから約束の情報を返す
    const userData = await prismaClient.userData.findUnique({
      where: {
        id: userid,
      },
    });

    // userDataがnullでないことを確認する
    if (userData !== null) {
      // その中にappoidがあるかどうかを確認する
      const involvedid = userData.involvedid as string[];
      const events = await prismaClient.calendar.findMany({
        where: {
          appoid: {
            in: involvedid,
          },
        },
      });
      return events;
    }
    return null;
  },
  save: async (userid: UserId, appoid: string) => {
    // dbのUserDataのinvolvedidのリストにappoidを追加する 同じappoidがあったら追加しない
    // まずはuseridのinvolvedidのリストを取得する
    const userData = await prismaClient.userData.findUnique({
      where: {
        id: userid,
      },
    });

    // userDataがnullでないことを確認する
    if (userData !== null) {
      // その中にappoidがあるかどうかを確認する
      const isAppoidIncluded = (userData.involvedid as string[]).includes(appoid);

      // なければ追加する
      if (!isAppoidIncluded) {
        await prismaClient.userData.update({
          where: {
            id: userid,
          },
          data: {
            involvedid: {
              push: appoid,
            },
          },
        });
      }
    } else {
      await prismaClient.userData.create({
        data: {
          id: userid,
          involvedid: [appoid],
        },
      });
    }
  },
};
