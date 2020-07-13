/**
 * covid19Helper-test.js
 * Created by Jonathan Hill 07/13/20
 */

import { latestSubmissionDateFormatted } from 'helpers/covid19Helper';
import { mockSubmissions } from '../testResources/mockSubmissions';

describe('Covid 19 Helper', () => {
    it('should find and format latest submission date', () => {
        expect(latestSubmissionDateFormatted(mockSubmissions)).toEqaul('Jun 29, 2020');
    });
})
