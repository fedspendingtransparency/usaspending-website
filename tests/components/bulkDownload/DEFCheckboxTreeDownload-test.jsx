/**
 * @jest-environment jsdom
 */
import React from 'react';
import { createStore } from 'redux';
import { render, screen, fireEvent } from 'test-utils';
import DEFCheckboxTreeDownload from 'components/bulkDownload/DEFCheckboxTreeDownload';
import { useDefCodes } from 'hooks/WithDefCodes';
import reducer from 'redux/reducers/index';

jest.mock('hooks/WithDefCodes', () => ({
    useDefCodes: jest.fn()
}));

jest.mock('components/sharedComponents/checkbox/AccordionCheckbox', () => jest.fn(({ singleFilterChange }) => (
    <button
        type="button"
        onClick={() => singleFilterChange({ value: 'L' })}>
        Toggle DEF Code L
    </button>
)));

const validDefCodes = [
    { code: 'L', title: 'Coronavirus Preparedness and Response Supplemental Appropriations Act, 2020', public_law: 'Public Law 116-123' }
];

describe('DEFCheckboxTreeDownload', () => {
    beforeEach(() => {
        useDefCodes.mockReturnValue(['', false, validDefCodes]);
    });

    it('stores the selected def code as an array, not a string, when checking the first code', () => {
        const initialState = {
            bulkDownload: {
                accounts: {
                    defCodes: []
                }
            }
        };
        const store = createStore(reducer, initialState);

        render(<DEFCheckboxTreeDownload type="accounts" />, { store });

        fireEvent.click(screen.getByText('Toggle DEF Code L'));

        expect(store.getState().bulkDownload.accounts.defCodes).toEqual(['L']);
    });
});
