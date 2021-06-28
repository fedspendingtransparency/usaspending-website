/**
 * ObligationsByAwardTypeContainer-test.jsx
 * Created by Brett Varney 6/28/21
 */

import React from 'react';
import { render, waitFor } from 'test-utils';
import ObligationsByAwardTypeContainer from 'containers/agencyV2/visualizations/ObligationsByAwardTypeContainer.jsx';
import * as agencyV2 from 'apis/agencyV2';

test('an API request is made for obligations by award type', () => {
    const mockResponse = {
        promise: Promise.resolve({
            data: {
                "total_aggregated_amount": 0,
                "results": [
                    { "category": "contracts", "aggregated_amount": 0 },
                    { "category": "direct_payments", "aggregated_amount": 0 },
                    { "category": "grants", "aggregated_amount": 0 },
                    { "category": "idv", "aggregated_amount": 0 },
                    { "category": "loans", "aggregated_amount": 0 },
                    { "category": "other", "aggregated_amount": 0 }
                ]
            }
        })
    }

    const spy = jest.spyOn(agencyV2, 'fetchObligationsByAwardType').mockReturnValueOnce(mockResponse);

    render(<ObligationsByAwardTypeContainer fiscalYear={2020} windowWidth={1000} />);

    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('123', 2020);
    });
});
