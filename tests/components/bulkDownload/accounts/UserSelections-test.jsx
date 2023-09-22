/**
 * @jest-environment jsdom
 * 
 * UserSelections-test.jsx
 * Created by Maxwell Kendall 04/09/2021
*/

import React from 'react';
import { render, screen, waitFor } from 'test-utils';

import { initialState } from 'redux/reducers/bulkDownload/bulkDownloadReducer';
import UserSelections from 'components/bulkDownload/accounts/UserSelections';

const defaultProps = {
    accounts: {
        ...initialState.accounts,
        defCodes: ['TEST!!!!', 'TEST2!!!!']
    }
};

test.each([
    [['test', 'accountBalances'], true],
    [['accountBalances'], false],
    [[], true]
])('when submission types include %s, def codes are displayed (want: %s) ', (arr, bool) => {
    render(<UserSelections accounts={{ ...defaultProps.accounts, submissionTypes: arr }} />);
    const defCodes = screen.queryAllByText(`TEST!!!!,TEST2!!!!`);
    if (bool) {
        expect(defCodes.length).toBeTruthy();
    }
    else {
        expect(defCodes.length).toBeFalsy();
    }
});
