/**
 * WithDefCodes-test.js
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

import * as helper from 'helpers/accountHelper';
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
    ['0000', '0', 2020, 12],
    [null, null, 2020, 12],
    ['2021', '0', 2020, 12],
    ['2012', '14', 2020, 12]
])(
    'useValidTimeBasedQueryParams: when fy is %s and period is %s, URL is updated 👌👌👌',
    (currentFy, currentPeriod, latestFy, latestPeriod) => {
        // reset history before each test
        history.push({ pathname: '', search: '' });
        jest.spyOn(hooks, 'useQueryParams').mockImplementation(() => {
            return {
                fy: currentFy,
                period: currentPeriod
            };
        });
        jest.spyOn(redux, 'useSelector').mockReturnValue({ submissionPeriods: new List([mockSubmissions[0]]) }).mockClear();
        const { result: { current: [fy, period] } } = renderHook(() => hooks.useValidTimeBasedQueryParams(currentFy, currentPeriod, ['fy', 'period']), { wrapper });
        expect(fy).toEqual(`${latestFy}`);
        expect(period.id).toEqual(`${latestPeriod}`);
        expect(history.location.search).toEqual(`?fy=${latestFy}&period=${latestPeriod}`);
    }
);
