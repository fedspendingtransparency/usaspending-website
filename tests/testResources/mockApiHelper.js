/**
 * mockApiHelper.js
 * Created by Max Kendall 04/23/2021
*/

/**
 * @param {object} mod the module from which which the method is exported; ex, import * as mod from 'some/path/'
 * @param {method} string the method on the module which is being mocked
 * @param {response} object which mocks the response
*/
export const mockApiCall = (mod, method, response) => {
  return jest.spyOn(mod, method).mockReturnValue({
      promise: Promise.resolve(response),
      cancel: () => { }
  });
};
