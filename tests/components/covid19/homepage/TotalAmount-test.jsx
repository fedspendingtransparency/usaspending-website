import React from 'react';
import TotalAmount from 'components/homepage/hero/TotalAmount';

// import { render, screen } from '../../../testResources/test-utils';
import { render, screen } from 'test-utils';

const reallyBigNumber = 1000000000000;

describe('TotalAmount', () => {
    jest.setTimeout(20000);
    it('updates from zero  to total in 6 seconds', (done) => {
        const completeIncrement = jest.fn();
        render(<TotalAmount
            total={reallyBigNumber}
            isLoading={false}
            completeIncrement={completeIncrement} />);

        expect(screen.queryByText('$0.00')).toBeTruthy();
        setTimeout(() => {
            expect(screen.queryByText('$0.00')).toBeFalsy();
        }, 1000); // 1 second
        setTimeout(() => {
            expect(screen.queryByText('$1.00 trillion')).toBeTruthy();
            done();
        }, 6500); // 1 second
    });
});
