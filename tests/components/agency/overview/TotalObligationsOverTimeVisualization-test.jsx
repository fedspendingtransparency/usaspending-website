/**
 * @jest-environment jsdom
 */
import React from 'react';

import { render, screen } from 'test-utils';
import TotalObligationsOverTimeVisualization from 'components/agency/visualizations/totalObligationsOverTime/TotalObligationsOverTimeVisualization';
import { defaultPadding } from 'dataMapping/agency/visualizations/totalObligationsOverTime';
import { mock2020Data, mock2021Data } from './mockData';

describe('Today Line', () => {
    it('should show today line', () => {
        render(<TotalObligationsOverTimeVisualization
            height={17}
            width={400}
            padding={defaultPadding}
            agencyBudget={3471478083842.64}
            data={mock2021Data}
            fy="2021"
            todaysDate={1622126989275} />);
        expect(screen.getByText('Today')).toBeTruthy();
    });

    it('should not show today line when todays date does not fall in the x domain', () => {
        render(<TotalObligationsOverTimeVisualization
            height={17}
            width={400}
            padding={defaultPadding}
            agencyBudget={3471478083842.64}
            data={mock2020Data}
            fy="2020"
            todaysDate={1622126989275} />);
        expect(screen.queryByText('Today')).toBeFalsy();
    });
});
