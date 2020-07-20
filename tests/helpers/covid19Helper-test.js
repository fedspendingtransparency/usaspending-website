/**
 * covid19Helper-test.js
 * Created by Jonathan Hill 07/14/20
 */

import { latestSubmissionDateFormatted } from 'helpers/covid19Helper';
import mockSubmissions from '../testResources/covid19MockData';

describe('Covid 19 Helper', () => {
    it('should find the latest submission date and format it', () => {
        expect(latestSubmissionDateFormatted(mockSubmissions)).toEqual('Jun 30, 2020');
    });
});
