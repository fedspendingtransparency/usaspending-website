/**
 * FYSummary-test.jsx
 * Created by Max Kendall 4/14/21
 */

import React from 'react';
import { render, waitFor } from 'test-utils';

import * as helpers from 'apis/agencyV2';
import FYSummary from 'components/agencyV2/overview/FySummary';

import { mockTotalBudgetaryResources } from './mockData';

test('No duplicate API requests', () => {
    const spy = jest.spyOn(helpers, 'fetchBudgetaryResources').mockReturnValue({
        promise: new Promise((resolve) => resolve({
            data: {
                agency_data_by_year: mockTotalBudgetaryResources
            }
        })),
        cancel: () => {}
    });
    render(<FYSummary isMobile={false} fy={'2020'} agencyId={'10'} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

test('No API request on FY change', () => {
    const spy = jest.spyOn(helpers, 'fetchBudgetaryResources').mockReturnValue({
        promise: new Promise((resolve) => resolve({
            data: {
                agency_data_by_year: mockTotalBudgetaryResources
            }
        })),
        cancel: () => {}
    });
    const { rerender } = render(<FYSummary isMobile={false} fy={'2020'} agencyId={'10'} />);
    spy.mockReset();

    rerender(<FYSummary isMobile={false} fy={'2021'} agencyId={'10'} />);
    expect(spy).not.toHaveBeenCalled();
});

test('Extra API request on Agency ID change', () => {
    const spy = jest.spyOn(helpers, 'fetchBudgetaryResources').mockReturnValue({
        promise: new Promise((resolve) => resolve({
            data: {
                agency_data_by_year: mockTotalBudgetaryResources
            }
        })),
        cancel: () => {}
    });
    const { rerender } = render(<FYSummary isMobile={false} fy={'2020'} agencyId={'10'} />);
    rerender(<FYSummary isMobile={false} fy={'2021'} agencyId={'11'} />);
    expect(spy).toHaveBeenCalledTimes(2);
});
