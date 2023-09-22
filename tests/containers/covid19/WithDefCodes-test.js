/**
 * @jest-environment jsdom
 * 
 * WithDefCodes-test.js
 * Created by Max Kendall 02/5/2021
* */

/*
* NOTE: We don't need to test the HOC because it just uses the hook.
* SOURCE/REFERENCE for testing custom hooks: https://kentcdodds.com/blog/how-to-test-custom-react-hooks
*/

import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from 'test-utils';
import * as redux from 'react-redux';
import * as helper from 'apis/disaster';
import * as actions from 'redux/actions/covid19/covid19Actions';

import { useDefCodes } from 'containers/covid19/WithDefCodes';

import { fetchDEFCodesMockReturnValue, mockDefCodes } from '../../mockData/helpers/disasterHelper';

let mockFetch;
let mockUseSelector;
let mockAction;

beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(() => (fn) => fn()).mockClear();
    mockFetch = jest.spyOn(helper, 'fetchDEFCodes').mockReturnValue(fetchDEFCodesMockReturnValue).mockClear();
    mockUseSelector = jest.spyOn(redux, 'useSelector').mockReturnValue({ defCodes: [] }).mockClear();
    mockAction = jest.spyOn(actions, 'setDEFCodes').mockClear();
});

test('fetches defCodes when they are not populated', async () => {
    renderHook(() => useDefCodes());
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        expect(mockAction).toHaveBeenCalledWith(mockDefCodes.data.codes.filter((c) => c.disaster === "covid_19"));
    });
});

test('does not fetch defCodes when they are populated', () => {
    mockUseSelector.mockReturnValue({ defCodes: [1] });
    const { result } = renderHook(() => useDefCodes());
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result.current[2]).toEqual([1]);
});
