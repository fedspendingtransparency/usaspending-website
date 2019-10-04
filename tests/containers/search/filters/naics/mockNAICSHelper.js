import { naicsMock2 } from './mockNAICS';

const newError = new Error('Bad');

export const naicsRequest = (fail) => {
  if (fail) {
    return (
        {
            promise: new Promise((resolve, reject) => {
                reject(newError);
            }),
            cancel: jest.fn()
        }
    );
  }
  return (
      {
          promise: new Promise((resolve) => {
              resolve({
                  data: { results: naicsMock2 }
              });
          }),
          cancel: jest.fn()
      }
  );
};
