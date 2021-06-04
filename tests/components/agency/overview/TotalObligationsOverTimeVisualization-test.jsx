import React from 'react';

import { render, screen } from 'test-utils';
import TotalObligationsOverTimeVisualization from 'components/agencyV2/visualizations/totalObligationsOverTime/TotalObligationsOverTimeVisualization';
import { defaultPadding } from 'dataMapping/agencyV2/visualizations/totalObligationsOverTime';

const mock2020Data = [
    {
        endDate: 1577768400000,
        obligated: 227170135560.3,
        period: 3
    },
    {
        endDate: 1585627200000,
        obligated: 580584099932.03,
        period: 6
    },
    {
        endDate: 1588219200000,
        obligated: 1040324359196.91,
        period: 7
    }
];

const mock2021Data = [
    {
        endDate: 1606712400000,
        obligated: 121466500151.75,
        period: 2
    },
    {
        endDate: 1609390800000,
        obligated: 225939783327.81,
        period: 3
    },
    {
        endDate: 1612069200000,
        obligated: 441947534122.58,
        period: 4
    },
    {
        endDate: 1614488400000,
        obligated: 549265048938.4,
        period: 5
    },
    {
        endDate: 1617163200000,
        obligated: 1045875996396.89,
        period: 6
    }
];

test('should show today line', () => {
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

test('should not show today line when todays date does not fall in the x domain', () => {
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
