import React from 'react';
import TotalAmount from 'components/homepage/hero/TotalAmount';

import { render, screen, waitFor } from '@test-utils';

const reallyBigNumber = 100000000000000;

describe('TotalAmount', () => {
    jest.setTimeout(20000);
    it('updates from zero  to total in 6 seconds', async () => {
        const completeIncrement = jest.fn();
        render(<TotalAmount
            total={reallyBigNumber}
            isLoading={false}
            completeIncrement={completeIncrement} />);

        await waitFor(() => { expect(screen.queryByText('$0.00')).toBeTruthy(); });

        await waitFor(() => { expect(screen.queryByText('$0.00')).toBeFalsy(); });
        await waitFor(() => {
            expect(screen.queryByText('$1.00 trillion')).toBeTruthy();
        }); // 1 second
    });
});
