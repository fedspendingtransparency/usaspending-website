/**
 * @jest-environment jsdom
 *
 * DateRange-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';

import { render, screen, fireEvent, act } from '../../../../testResources/test-utils';
// import DateRange from "../../../../../src/js/components/search/filters/timePeriod/DateRange";
import TimePeriodContainer from "../../../../../src/js/containers/search/filters/TimePeriodContainer";

describe('DateRange', () => {
    it('should clear input field after submitting', async () => {
        // render(<DateRange {...mockProps} />);
        render(<TimePeriodContainer />);

        act(() => {
            fireEvent.change(screen.getByLabelText('start date'), {
                target: { value: '01/01/2025' }
            });
            fireEvent.change(screen.getByLabelText('end date'), {
                target: { value: '02/01/2025' }
            });
        });

        expect(screen.getByLabelText('start date')).toHaveValue('01/01/2025');
        expect(screen.getByLabelText('end date')).toHaveValue('02/01/2025');

        act(() => {
            fireEvent.click(screen.getAllByText('Add')[0]);
        });

        expect(screen.getByLabelText('start date')).not.toHaveValue();
        expect(screen.getByLabelText('end date')).not.toHaveValue();
    });
});
