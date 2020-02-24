/**
 * apiHelper-test.js
 * Created by Jonathan Hill on 12/12/19.
*/

import { apiRequest } from 'helpers/apiRequest';
import { encodedAwardId, decodedAwardId } from "../mockData";

describe('API Request', () => {
    const mockRequest = apiRequest();
    it('should return all properties', () => {
        const newRequest = apiRequest();
        expect(newRequest).toHaveProperty('promise');
        expect(newRequest).toHaveProperty('execute');
        expect(newRequest).toHaveProperty('cancel');
        expect(newRequest).toHaveProperty('before');
        expect(newRequest).toHaveProperty('after');
        expect(newRequest).toHaveProperty('headers');
        expect(newRequest).toHaveProperty('params');
    });
    describe('Headers method', () => {
        it('should return default headers', () => {
            const newRequest = apiRequest();
            const headers = newRequest.headers();
            expect(headers).toEqual(mockRequest.headers());
        });
        it('should add additional headers', () => {
            const newRequest = apiRequest();
            const additionalHeaders = newRequest.headers({
                "content-type": "application/json"
            });
            expect(additionalHeaders).toHaveProperty('content-type');
            expect(additionalHeaders).toHaveProperty('X-Requested-With');
        });
    });
    describe('Params method', () => {
        it('should return default params', () => {
            const newRequest = apiRequest();
            const params = newRequest.params();
            expect(params).toHaveProperty('baseURL');
            expect(params).toHaveProperty('cancelToken');
            expect(params).toHaveProperty('headers');
        });
        it('should add additional params', () => {
            const newRequest = apiRequest();
            const params = newRequest.params({ method: 'post' });
            expect(params).toHaveProperty('method');
        });
        it('should decode any award ids in a POST request', () => {
            const urlWithEncodedAwardId = `v2/awards/count/test/${encodedAwardId}`;
            const newRequest = apiRequest();
            let params = newRequest.params({ method: 'post', data: { award_id: encodedAwardId } });
            expect(params).toHaveProperty('method');
            expect(params.data.award_id).toEqual(decodedAwardId);

            params = newRequest.params({ url: urlWithEncodedAwardId });

            expect(params.url).toEqual(urlWithEncodedAwardId);
        });
    });
});
