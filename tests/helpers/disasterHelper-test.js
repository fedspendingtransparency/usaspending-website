/**
 * disasterHelper-test.js
 * Created by Jonathan Hill 07/14/20
 */

import { defCodeQueryString } from 'helpers/disasterHelper';

const defCodes = ['L', 'M', 'N'];

describe('Disaster Helper', () => {
    it('should format an array of def codes to a string', () => {
        expect(defCodeQueryString(defCodes)).toEqual('L,M,N');
    });
});
