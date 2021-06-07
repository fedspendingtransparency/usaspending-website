/*
 * CountTabContainer-test
 * Created by Max Kendall 04/21/2021
*/
import React from 'react';
import { render, waitFor } from 'test-utils';

import * as apis from 'apis/agencyV2';
import * as actions from 'redux/actions/agencyV2/agencyV2Actions';
import CountTabContainer from 'containers/agencyV2/accountSpending/CountTabContainer';
import { tabs } from 'components/agencyV2/accountSpending/AccountSpending';

const mockResponse = {
    toptier_code: '123',
    fiscal_year: 1999,
    object_class_count: 9,
    program_activity_count: 10,
    federal_account_count: 11,
    messages: []
};

const mockProps = {
    fy: '1999',
    agencyId: '123',
    setActiveTab: () => {},
    activeTab: tabs[0].internal,
    tabs
};

afterEach(() => {
    jest.clearAllMocks();
});

test('makes a count request for each tab when a fiscal year is defined', () => {
    const spy = jest.spyOn(apis, 'fetchSpendingCount').mockReturnValue({
        promise: Promise.resolve({ data: mockResponse }),
        cancel: jest.fn()
    });
    render(<CountTabContainer {...mockProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(tabs.length);
    });
});

test('does not make count requests when the fiscal year is falsy', () => {
    const spy = jest.spyOn(apis, 'fetchSpendingCount').mockReturnValue({
        promise: Promise.resolve({ data: mockResponse }),
        cancel: jest.fn()
    });
    render(<CountTabContainer {...mockProps} fy="" />);
    return waitFor(() => {
        expect(spy).not.toHaveBeenCalled();
    });
});

test('updates the Redux state for each tab with the count from the API', () => {
    jest.spyOn(apis, 'fetchSpendingCount').mockReturnValue({
        promise: Promise.resolve({ data: mockResponse }),
        cancel: jest.fn()
    });
    const spy = jest.spyOn(actions, 'setBudgetCategoryCount');
    render(<CountTabContainer {...mockProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledWith('programActivity', 10);
        expect(spy).toHaveBeenCalledWith('objectClass', 9);
        expect(spy).toHaveBeenCalledWith('federalAccount', 11);
    });
});
