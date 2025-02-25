/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '../../../testResources/test-utils';
import AwardHistory from '../../../../src/js/containers/award/shared/AwardHistorySectionContainer';
import * as awardHistoryHelper from "../../../../src/js/helpers/awardHistoryHelper";

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
        const getAwardHistoryCountSpy = jest.spyOn(awardHistoryHelper, "getAwardHistoryCounts").mockReturnValue({
            count: 1,
        })
        expect(getAwardHistoryCountSpy).toHaveBeenCalledTimes(0)
        render(<AwardHistory {...mockProps}/>);
        expect(getAwardHistoryCountSpy).toHaveBeenCalledTimes(2);
        expect(getAwardHistoryCountSpy).toReturnWith({ count: 1 })
    });
});

