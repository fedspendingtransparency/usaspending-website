/**
 * @jest-environment jsdom
 *
 * slideoutHelper-test.js
 */
import React from 'react';
import { combineReducers, createStore } from 'redux';
import * as redux from 'react-redux';
import storeSingleton from 'redux/storeSingleton';
import { beforeEach, expect } from '@jest/globals';
import { render, waitFor } from '../testResources/test-utils';
import { showSlideout } from "../../src/js/helpers/slideoutHelper";
import glossaryReducer from "../../src/js/redux/reducers/glossary/glossaryReducer";
import atdReducer from "../../src/js/redux/reducers/aboutTheDataSidebar/aboutTheDataReducer";
import slideoutReducer from "../../src/js/redux/reducers/slideouts/slideoutReducer";
// import * as atdActions from "../../src/js/redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import * as glossaryActions from "../../src/js/redux/actions/glossary/glossaryActions";
import * as slideoutActions from "../../src/js/redux/actions/slideouts/slideoutActions";

const mockAPPReducer = combineReducers({
    glossary: glossaryReducer,
    aboutTheDataSidebar: atdReducer,
    slideouts: slideoutReducer
});

const mockData = {
    glossary: {
        display: false,
        term: {
            term: '',
            data_act_term: '',
            slug: '',
            plain: '',
            official: '',
            resources: '',
            termFromUrl: ''
        },
        termFromUrl: ''
    },
    aboutTheDataSidebar: {
        display: false,
        term: {
            name: '',
            slug: ''
        },
        search: {
            input: '',
            results: {
                descriptions: {
                    heading: 'Sitewide Data Source Descriptions',
                    path: 'content/about-the-data/descriptions',
                    fields: [
                        {
                            name: 'GTAS (Governmentwide Treasury Account Symbol Adjusted Trial Balance System)',
                            slug: 'gtas'
                        },
                        {
                            name: 'File A (Account Balances)',
                            slug: 'file-a'
                        },
                        {
                            name: 'File B (Account Breakdown by Program Activity & Object Class)',
                            slug: 'file-b'
                        },
                        {
                            name: 'File C (Account Breakdown by Award)',
                            slug: 'file-c'
                        },
                        {
                            name: 'File D1 (Award and Awardee Attributes (Procurement))',
                            slug: 'file-d1'
                        },
                        {
                            name: 'File D2 (Award and Awardee Attributes (Financial Assistance))',
                            slug: 'file-d2'
                        },
                        {
                            name: 'File E (Additional Awardee Attributes)',
                            slug: 'file-e'
                        },
                        {
                            name: 'File F (Subaward Attributes)',
                            slug: 'file-f'
                        }
                    ]
                },
                disclosures: {
                    heading: 'Sitewide Data Source Disclosures',
                    path: 'content/about-the-data/disclosures',
                    fields: [
                        {
                            name: 'Reporting Requirement for Federal Agencies',
                            slug: 'reporting-requirement-for-federal-agencies'
                        },
                        {
                            name: 'Start Date for Spending Data on USAspending.gov',
                            slug: 'start-date-for-spending-data'
                        },
                        {
                            name: 'Frequency of Updates to Agency Account Data',
                            slug: 'frequency-of-updates-to-agency-account-data'
                        },
                        {
                            name: 'Data Validation of Source Systems',
                            slug: 'data-validation-of-source-systems'
                        },
                        {
                            name: 'Changes in Reporting Requirements',
                            slug: 'changes-in-reporting-requirements'
                        },
                        {
                            name: 'Financing Accounts',
                            slug: 'financing-accounts'
                        }
                    ]
                },
                'award-disclosures': {
                    heading: 'Sitewide Award Data Disclosures',
                    path: 'content/about-the-data/award-disclosures',
                    fields: [
                        {
                            name: 'Start Date for Prime Award and Subaward Data on USAspending.gov',
                            slug: 'start-date-for-prime-award-and-subaward-data'
                        },
                        {
                            name: 'Definition of Award Recipient (Entity Receiving a Federal Award)',
                            slug: 'definition-of-award-recipient'
                        },
                        {
                            name: 'Reporting Threshold for Prime Awards',
                            slug: 'reporting-threshold-for-prime-awards'
                        },
                        {
                            name: 'Frequency of Updates to Prime Award Data for Contracts (Procurement)',
                            slug: 'frequency-of-updates-to-prime-award-data-for-contracts'
                        },
                        {
                            name: 'Frequency of Updates to Prime Award Data for Financial Assistance',
                            slug: 'frequency-of-updates-to-prime-award-data-for-financial-assistance'
                        },
                        {
                            name: 'Reporting Threshold for Subawards',
                            slug: 'reporting-threshold-for-subawards'
                        },
                        {
                            name: 'Frequency of Updates to Subaward Data',
                            slug: 'frequency-of-updates-to-subaward-data'
                        },
                        {
                            name: 'Subaward Data Quality',
                            slug: 'subaward-data-quality'
                        },
                        {
                            name: 'Limited Data for Unlinked Prime Awards',
                            slug: 'limited-data-for-unlinked-prime-awards'
                        },
                        {
                            name: 'Award Description Data Quality',
                            slug: 'award-description-data-quality'
                        },
                        {
                            name: 'Delay in Department of Defense (DOD) Procurement Data',
                            slug: 'delay-in-dod-procurement-data'
                        },
                        {
                            name: 'Medicare Location Data',
                            slug: 'medicare-location-data'
                        },
                        {
                            name: 'Congressional District Data',
                            slug: 'congressional-district-data'
                        },
                        {
                            name: 'Personally Identifiable Information (PII) and Aggregate Records',
                            slug: 'pii-and-aggregate-records'
                        },
                        {
                            name: 'Personally Identifiable Information (PII) and Redacted Records',
                            slug: 'pii-and-redacted-records'
                        }
                    ]
                }
            }
        },
        termFromUrl: ''
    }
};
const store = createStore(mockAPPReducer, mockData);
storeSingleton.setStore(store);

describe('showSlideout', () => {
    const mockActions = {
        showGlossary: jest.fn(),
        setLastOpenedSlideout: jest.fn()
    };
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.spyOn(redux, 'useDispatch').mockReturnValue(() => (fn) => fn()).mockClear();
    });


    it('should dispatch showGlossary and setLastOpenedSlideout when showSlideout helper function is called with no options', async () => {
        render(<></>, { initialState: mockAPPReducer, store });
        const mockGlossaryAction = jest.spyOn(glossaryActions, 'showGlossary').mockClear();
        const mocksetLastAction = jest.spyOn(slideoutActions, 'setLastOpenedSlideout').mockClear();

        showSlideout('glossary');

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledTimes(2);
            expect(mockGlossaryAction).toHaveBeenCalledWith(mockActions.showGlossary);
            expect(mocksetLastAction).toHaveBeenCalledWith(mockActions.setLastOpenedSlideout);
        });
    });
});
