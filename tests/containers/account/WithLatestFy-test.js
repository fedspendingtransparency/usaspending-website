/**
 * @jest-environment jsdom
 * 
 * WithLatestFy-test.js
 * Created by Max Kendall 02/5/2021
* */

/*
* NOTE: We don't need to test the HOC because it just uses the hook.
* SOURCE/REFERENCE for testing custom hooks: https://kentcdodds.com/blog/how-to-test-custom-react-hooks
*/
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { List } from 'immutable';
import { renderHook } from '@testing-library/react-hooks';
import * as redux from 'react-redux';

import { waitFor } from 'test-utils';

import * as helper from 'apis/account';
import * as queryParamHelpers from 'helpers/queryParams';
import * as actions from 'redux/actions/account/accountActions';
import * as hooks from 'containers/account/WithLatestFy';
import { mockSubmissions } from '../../mockData/helpers/aboutTheDataHelper';

let mockFetch;
let mockUseSelector;
let mockAction;

const history = createMemoryHistory();

const wrapper = ({ children }) => (
    <Router history={history}>
        {children}
    </Router>
);

beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(() => (fn) => fn()).mockClear();
    mockFetch = jest.spyOn(helper, 'fetchAllSubmissionDates').mockReturnValue({
        promise: Promise.resolve({ data: { available_periods: mockSubmissions } }),
        cancel: () => {
            console.log('cancel called');
        }
    });

    mockUseSelector = jest.spyOn(redux, 'useSelector').mockReturnValue({ submissionPeriods: new List([]) }).mockClear();
    mockAction = jest.spyOn(actions, 'setSubmissionPeriods').mockClear();
});

test('useLatestAccountData: fetches periods when they are not populated', async () => {
    renderHook(() => hooks.useLatestAccountData());
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        expect(mockAction).toHaveBeenCalledWith(mockSubmissions);
    });
});

test('useLatestAccountData: does not fetch periods when they are populated', () => {
    mockFetch.mockClear();
    mockUseSelector.mockReturnValue({ submissionPeriods: new List([1]) });
    const { result } = renderHook(() => hooks.useLatestAccountData());
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result.current[1]).toEqual(new List([1]));
});

test.each([
    [null, null, 2020, 12, ['fy']],
    ['0000', null, 2020, 12, ['fy']],
    ['4020', null, 2020, 12, ['fy']],
    ['0000', '0', 2020, 12, ['fy', 'period']],
    [null, null, 2020, 12, ['fy', 'period']],
    ['2021', '0', 2020, 12, ['fy', 'period']],
    ['2012', '14', 2020, 12, ['fy', 'period']],
    ['2021cats', 'toast', 2020, 12, ['fy', 'period']]
])(
    'useValidTimeBasedQueryParams: when fy is %s and period is %s, URL is updated 👌👌👌',
    (currentFy, currentPeriod, latestFy, latestPeriod, requiredParams) => {
        // reset history before each test
        history.push({ pathname: '', search: '' });
        jest.spyOn(queryParamHelpers, 'useQueryParams').mockImplementation(() => {
            if (requiredParams.includes('period')) {
                return {
                    fy: currentFy,
                    period: currentPeriod
                }
            }
            return { fy: currentFy };
        });
        jest.spyOn(redux, 'useSelector').mockReturnValue({ submissionPeriods: new List([mockSubmissions[0]]) }).mockClear();
        const { result: { current: [fy, period] } } = renderHook(() => hooks.useValidTimeBasedQueryParams(currentFy, currentPeriod, requiredParams), { wrapper });
        expect(fy).toEqual(`${latestFy}`);
        if (requiredParams.includes('period')) {
            expect(period.id).toEqual(`${latestPeriod}`);
            expect(history.location.search).toEqual(`?fy=${latestFy}&period=${latestPeriod}`);
        }
        else {
            expect(history.location.search).toEqual(`?fy=${latestFy}`);
        }
    }
);
