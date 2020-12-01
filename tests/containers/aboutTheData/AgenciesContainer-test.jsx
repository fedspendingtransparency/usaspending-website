import React from 'react';
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';

import { render, screen, fireEvent } from '@test-utils';

describe('AgenciesContainer', () => {
    beforeEach(() => render(<AgenciesContainer />));
    describe('tab change', () => {
        // only fires one api request
        // shows the correct table
        it('renders the details table first', () => {
            const table = screen.getByText('Count of Agency TAS in GTAS Not in File A');
            expect(table).toBeDefined();
        });
        it('renders the dates table on tab click', () => {
            const tab = screen.getAllByText('Updates by Fiscal Year');
            fireEvent.click(tab[0]);
            const table = screen.getByText('FY 2020 Q4');
            expect(table).toBeDefined();
        });
    });
});
