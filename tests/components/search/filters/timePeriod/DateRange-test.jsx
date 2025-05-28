/**
 * @jest-environment jsdom
 *
 * DateRange-test.jsx
 * Created by Josue Aguilar 4/28/2025
 */

import React from 'react';

import { render, screen, fireEvent, act } from '../../../../testResources/test-utils';
import TimePeriodContainer from "../../../../../src/js/containers/search/filters/TimePeriodContainer";

describe('DateRange', () => {
    it('should clear input field after submitting', async () => {
        render(<TimePeriodContainer />);

        act(() => {
            fireEvent.change(screen.getByLabelText('start date'), {
                target: { value: '2025-01-01' }
            });
            fireEvent.change(screen.getByLabelText('end date'), {
                target: { value: '2025-02-01' }
            });
        });

        expect(screen.getByLabelText('start date')).toHaveValue('2025-01-01');
        expect(screen.getByLabelText('end date')).toHaveValue('2025-02-01');

        act(() => {
            fireEvent.click(screen.getAllByText('Add')[0]);
        });

        expect(screen.getByLabelText('start date')).not.toHaveValue();
        expect(screen.getByLabelText('end date')).not.toHaveValue();
    });
});
