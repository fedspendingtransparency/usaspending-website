/**
 * moreOptionsTabsHelper-test.js
 * Created by James Lee on 6/26/20
*/

import React from 'react';
import { getIndexesToDelete, adaptTabs } from 'helpers/moreOptionsTabs/moreOptionsTabsHelper';

const mockHtmlCollection = [
    {
        offsetWidth: 300
    },
    {
        offsetWidth: 300
    },
    {
        offsetWidth: 300
    },
    {
        offsetWidth: 300
    },
    {
        offsetWidth: 300
    },
    {
        offsetWidth: 300
    }
];

const mockZeroWidthHtmlCollection = [
    {
        offsetWidth: 0
    },
    {
        offsetWidth: 0
    },
    {
        offsetWidth: 0
    }
];

export const mockAwardSpendingAgencyTableTabs = [
    {
        enabled: true,
        internal: 'all',
        label: 'All Awards'
    },
    {
        enabled: true,
        internal: 'contracts',
        label: 'Contracts'
    },
    {
        enabled: true,
        internal: 'idvs',
        label: 'Contract IDVs'
    },
    {
        enabled: true,
        internal: 'grants',
        label: 'Grants'
    },
    {
        enabled: true,
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        enabled: true,
        internal: 'loans',
        label: 'Loans'
    }
];


describe('moreOptionsTabs Helper', () => {
    const setShowMoreOptions = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((showMoreOptions) => [showMoreOptions, setShowMoreOptions]);

    const setPickerOptions = jest.fn();
    useStateSpy.mockImplementation((pickerOptions) => [pickerOptions, setPickerOptions]);

    const setTabTypes = jest.fn();
    useStateSpy.mockImplementation((tabTypes) => [tabTypes, setTabTypes]);


    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the correct indexes to delete', () => {
        const indexes = getIndexesToDelete(mockHtmlCollection, mockAwardSpendingAgencyTableTabs, 1000, 200, setShowMoreOptions, setPickerOptions);
        expect(indexes).toEqual([1, 2, 3, 4, 5]);
        expect(setShowMoreOptions).toHaveBeenCalledWith(false);
        expect(setPickerOptions).toHaveBeenCalledTimes(0);

        adaptTabs(indexes, mockAwardSpendingAgencyTableTabs, mockAwardSpendingAgencyTableTabs, setShowMoreOptions, setTabTypes, setPickerOptions);
        expect(setShowMoreOptions).toHaveBeenCalledWith(false);

        const pickerOptionsActual = [
            {
                value: 'contracts',
                name: 'Contracts'
            },
            {
                value: 'idvs',
                name: 'Contract IDVs'
            },
            {
                value: 'grants',
                name: 'Grants'
            },
            {
                value: 'direct_payments',
                name: 'Direct Payments'
            },
            {
                value: 'loans',
                name: 'Loans'
            }
        ];

        expect(setPickerOptions).toHaveBeenCalledWith(pickerOptionsActual);

        const tabTypesActual = [
            {
                enabled: true,
                internal: "all",
                label: "All Awards"
            }
        ];

        expect(setTabTypes).toHaveBeenCalledWith(tabTypesActual);
    });

    it('should return the correct states for showMoreOptions and pickerOptions when the widths are zero', () => {
        const indexes = getIndexesToDelete(mockZeroWidthHtmlCollection, mockAwardSpendingAgencyTableTabs, 1000, 200, setShowMoreOptions, setPickerOptions);
        expect(indexes).toEqual(null);
        expect(setShowMoreOptions).toHaveBeenCalledWith(true);

        const pickerOptionsActual = [
            {
                value: 'all',
                name: 'All Awards'
            },
            {
                value: 'contracts',
                name: 'Contracts'
            },
            {
                value: 'idvs',
                name: 'Contract IDVs'
            },
            {
                value: 'grants',
                name: 'Grants'
            },
            {
                value: 'direct_payments',
                name: 'Direct Payments'
            },
            {
                value: 'loans',
                name: 'Loans'
            }
        ];

        expect(setPickerOptions).toHaveBeenCalledWith(pickerOptionsActual);

        adaptTabs(indexes, mockAwardSpendingAgencyTableTabs, mockAwardSpendingAgencyTableTabs, setShowMoreOptions, setTabTypes, setPickerOptions);
        expect(setTabTypes).toHaveBeenCalledTimes(0);
        expect(setPickerOptions).toHaveBeenCalledWith(pickerOptionsActual);
    });
});
