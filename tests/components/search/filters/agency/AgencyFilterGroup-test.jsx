/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { OrderedMap } from "immutable";
import { legacy_createStore as createStore } from "redux";

import AgencyFilterGroup from 'components/search/topFilterBar/filterGroups/AgencyFilterGroup';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

let mockAgency = new OrderedMap({
    '1111_subteir': {
        id: '1111',
        toptier_flag: false,
        agencyType: "subtier",
        toptier_agency: {
            abbreviation: 'TA',
            name: 'Toptier Agency',
            toptier_code: '111'
        },
        subtier_agency: {
            abbreviation: 'SA',
            name: 'Subtier Agency'
        }
    }
},
{
    '2222_subteir': {
        id: '2222',
        toptier_flag: false,
        agencyType: "subtier",
        toptier_agency: {
            abbreviation: null,
            name: 'Toptier Agency',
            toptier_code: '222'
        },
        subtier_agency: {
            abbreviation: 'SA',
            name: 'Subtier Agency'
        }
    }
});

mockAgency = mockAgency.set('2222_subteir', {
    id: '2222',
    toptier_flag: false,
    agencyType: "subtier",
    toptier_agency: {
        abbreviation: null,
        name: 'Toptier Agency',
        toptier_code: '222'
    },
    subtier_agency: {
        abbreviation: 'SA',
        name: 'Subtier Agency'
    }
});

const mockStore = {
    filters: { selectedFundingAgencies: mockAgency },
    appliedFilters: { filters: { selectedFundingAgencies: mockAgency } }
};

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn().mockImplementation((callback) => callback(mockStore))
}));

describe('AgencyFilterGroup', () => {
    it('Should use toptier abbreviation in tag', () => {
        render(
            <Provider store={createStore(jest.fn(), mockStore)}>
                <AgencyFilterGroup name="FUNDING AGENCY" code="selectedFundingAgencies" />
            </Provider>
        );

        expect(screen.queryByText('Subtier Agency (SA) | Sub-Agency of TA')).toBeTruthy();
    });
    it('Should use toptier name in tag', () => {
        render(
            <Provider store={createStore(jest.fn(), mockStore)}>
                <AgencyFilterGroup name="FUNDING AGENCY" code="selectedFundingAgencies" />
            </Provider>
        );

        expect(screen.queryByText('Subtier Agency (SA) | Sub-Agency of Toptier Agency'))
            .toBeTruthy();
    });
});
