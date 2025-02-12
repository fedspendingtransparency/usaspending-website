/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '../../../testResources/test-utils';
import AwardHistory from '../../../../src/js/containers/award/shared/AwardHistorySectionContainer';

const mockedSetActiveTab = jest.fn();
const mockProps = {
    overview: {
        generatedId: '123',
        category: 'idv'
    },
    setActiveTab: mockedSetActiveTab,
    activeTab: 'transaction'
};

describe('setTableTabsAndGetCounts', () => {
    it('changes tabs and get the table count', () => {
        render(<AwardHistory {...mockProps} />);
    });
});

