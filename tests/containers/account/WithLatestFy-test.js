/**
 * WithDefCodes-test.js
 * Created by Max Kendall 02/5/2021
* */

/*
* NOTE: We don't need to test the HOC because it just uses the hook.
* SOURCE/REFERENCE for testing custom hooks: https://kentcdodds.com/blog/how-to-test-custom-react-hooks
*/

import { List } from 'immutable';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from 'test-utils';
import * as redux from 'react-redux';
import * as helper from 'helpers/accountHelper';
import * as actions from 'redux/actions/account/accountActions';

import { useLatestAccountData } from 'containers/account/WithLatestFy';
import { mockSubmissions } from '../../mockData/helpers/aboutTheDataHelper';

let mockFetch;
let mockUseSelector;
let mockAction;

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

test('fetches periods when they are not populated', async () => {
    renderHook(() => useLatestAccountData());
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        expect(mockAction).toHaveBeenCalledWith(mockSubmissions);
    });
});

test('does not fetch periods when they are populated', () => {
    mockFetch.mockClear();
    mockUseSelector.mockReturnValue({ submissionPeriods: new List([1]) });
    const { result } = renderHook(() => useLatestAccountData());
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result.current[1]).toEqual(new List([1]));
});
