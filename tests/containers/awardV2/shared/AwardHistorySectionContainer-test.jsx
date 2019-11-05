import React from 'react';
import { shallow } from 'enzyme';

import { AwardHistory } from '../../../../src/js/containers/awardV2/shared/AwardHistorySectionContainer';

jest.mock('helpers/awardHistoryHelper', () => require('./mockAwardHistoryHelper'));

const mockedSetActiveTab = jest.fn();

const defaultProps = {
    overview: { generatedId: '123', category: 'idv' },
    awardId: '123',
    setActiveTab: mockedSetActiveTab,
    activeTab: 'transactions'
};

describe('AwardHistorySectionContainer', () => {
    describe('componentDidMount', () => {
        it('calls setTableWidth & setTableTabsAndGetCounts', async () => {
            const container = shallow(<AwardHistory {...defaultProps} />);
            const setTableWidthMock = jest.fn();
            const setTableTabsAndGetCountsMock = jest.fn();
            container.instance().setTableTabsAndGetCounts = setTableTabsAndGetCountsMock;
            container.instance().setTableWidth = setTableWidthMock;

            await container.instance().componentDidMount();
            
            expect(setTableWidthMock).toHaveBeenCalledTimes(1);
            expect(setTableTabsAndGetCountsMock).toHaveBeenCalledTimes(1);
        });
    });

    // describe('when generatedId prop changes', () => {
    //     const container = shallow(<AwardHistory {...defaultProps} />);
    //     const mockSetTableTabsAndGetCounts = jest.fn();
    //     container.instance().mockSetTableTabsAndGetCounts = mockSetTableTabsAndGetCounts;

    //     it('calls setActiveTab and setTableTablsAndGetCounts', () => {
    //         container.setProps({ overview: { generatedId: "456" } });
    //         expect(mockSetTableTabsAndGetCounts).toHaveBeenCalledTimes(1);
    //         expect(mockedSetActiveTab).toHaveBeenCalledTimes(1);
    //     });
    // });

    describe('setTableTabsAndGetCounts', () => {
        it('sets this.state.tabs for IDVs', () => {
            const idvContainer = shallow(<AwardHistory {...defaultProps} />);
            idvContainer.instance().setTableTabsAndGetCounts()
                .then(() => {
                    const { tabs } = idvContainer.state();
                    tabs.forEach((tab) => {
                        expect(tab.internal).not.toEqual('subaward');
                        expect(tab.count).toEqual(4);
                    });
                });
        });
        it('sets this.state.tabs for asst award types', () => {
            const loanContainer = shallow(<AwardHistory {...{ ...defaultProps, category: "loan" }} />);
            loanContainer.instance().setTableTabsAndGetCounts()
                .then(() => {
                    const { tabs } = loanContainer.state();
                    tabs.forEach((tab) => {
                        expect(tab.internal).not.toEqual('subaward');
                        expect(tab.count).toEqual(4);
                    });
                });
        });
        it('sets this.state.tabs w/ sub award for grants/contracts', () => {
            const grantContainer = shallow(<AwardHistory {...{ ...defaultProps, category: "grant" }} />);
            const contractContainer = shallow(<AwardHistory {...{ ...defaultProps, category: "contract" }} />);
            grantContainer.instance().setTableTabsAndGetCounts()
                .then(() => {
                    const { tabs } = grantContainer.state();
                    tabs.forEach((tab) => {
                        expect(tab.count).toEqual(4);
                    });
                    const hasSubAwardTab = tabs.filter((tab) => tab.internal === 'subaward');
                    expect(hasSubAwardTab.length).toEqual(1);
                });
            contractContainer.instance().setTableTabsAndGetCounts()
                .then(() => {
                    const { tabs } = grantContainer.state();
                    tabs.forEach((tab) => {
                        expect(tab.count).toEqual(4);
                    });
                    const hasSubAwardTab = tabs.filter((tab) => tab.internal === 'subaward');
                    expect(hasSubAwardTab.length).toEqual(1);
                });
        });
    });
});
