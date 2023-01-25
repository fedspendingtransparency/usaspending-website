/**
 * DrilldownSidebar-test.jsx
 * Created by Lizzie Salita 11/23/21
 */

import React from 'react';
import DrilldownSidebar
    from "components/agency/statusOfFunds/DrilldownSidebar";
import { render, screen } from '../../../testResources/test-utils';

describe('Agency V2 Status of Funds DrilldownSidebar', () => {
    const level0 = {
        level: 0,
        fy: '1999',
        agencyName: 'Department of Sandwiches',
        selectedLevelDataList: [{
            name: 'Bureau of Subs',
            id: '456',
            budgetaryResources: '$55.61 M',
            obligations: '$44.50 M'
        }]
    };

    const level1 = {
        level: 1,
        fy: '1999',
        agencyName: 'Ministry of Magic',
        selectedLevelDataList: [{
            name: 'Department of Mysteries',
            id: '123',
            budgetaryResources: '$45.61 M',
            obligations: '$34.50 M'
        }]
    };

    it('always renders the parent agency level', () => {
        render(<DrilldownSidebar {...level0} />);
        expect(screen.queryByText(level0.agencyName)).toBeTruthy();

        render(<DrilldownSidebar {...level1} />);
        expect(screen.queryByText(level1.agencyName)).toBeTruthy();
    });

    it('only renders the subcomponent level when level > 0', () => {
        render(<DrilldownSidebar {...level0} />);
        expect(screen.queryByText(level0.selectedLevelDataList[0].name)).toBeFalsy();

        render(<DrilldownSidebar {...level1} />);
        expect(screen.queryByText(level1.selectedLevelDataList[0].name)).toBeTruthy();
    });
});
