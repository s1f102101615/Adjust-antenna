import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: {
      id: string;
      appoid: string;
      title: string;
      details: string;
      location: string;
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
      createdAt: Date;
  }[] | null;
  };
  post: {
    reqBody: {
      appoid: string;
    };
    }
  }>
