/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, waitFor } from 'test-utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as redux from 'react-redux';
import { List } from 'immutable';

import * as agencyReportingAPI from 'apis/agencyReporting';
import AgenciesContainer from 'containers/aboutTheData/AgenciesContainer';
import { mockAPI } from './mockData';

const defaultProps = {
    selectedFy: '2020',
    selectedPeriod: '8',
    activeTab: 'submissions',
    openModal: jest.fn()
};

const mockResponses = {
    submissionsRequest: {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        // returns multiple pages of data when limit is 10
                        page_metadata: mockAPI.submissions.data.page_metadata,
                        results: mockAPI.submissions.data.results.concat(mockAPI.submissions.data.results)
                    }
                });
            });
        }),
        cancel: () => {
            console.log('cancel executed!');
        }
    },
    totalsRequest: {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve(mockAPI.totals);
            });
        }),
        cancel: () => {
            console.log('cancel executed!');
        }
    },
    publicationsRequest: {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: {
                        page_metadata: mockAPI.publications.data.page_metadata,
                        results: mockAPI.publications.data.results.concat(mockAPI.publications.data.results)
                    }
                });
            });
        }),
        cancel: () => {
            console.log('cancel executed!');
        }
    }
};

/**
 * we cant use the fireEvent or userEvent module to test b/c those user interactions don't actually
 * trigger redux updates in our test env. If we were using local state, we could use these APIs, but
 * for now while redux is not functional in our test env we should just test as below, updating props
 * via re-render to simulate user interactions: update sort, paginate, etc... 👇
 * */

test('once fy/period are defined, only one request for totals is made, then only one request is made for table data', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
        ])
    });
    const fetchTotals = jest.spyOn(agencyReportingAPI, 'getTotalBudgetaryResources').mockClear().mockReturnValue(mockResponses.totalsRequest);
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockReturnValue(mockResponses.submissionsRequest);
    // render 1: no fy/period -- no requests made
    const { rerender } = render(<AgenciesContainer {...defaultProps} selectedFy="" selectedPeriod="" />);
    // render 2: fy & period defined; no totals -- one request for fetchTotals
    rerender(<AgenciesContainer {...defaultProps} />);
    // render 3: fy & period & totals all defined -- one request for fetchSubmissions
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: 'test',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    rerender(<AgenciesContainer {...defaultProps} />);

    return waitFor(() => {
        expect(fetchTotals).toHaveBeenCalledTimes(1);
        expect(submissionsRequest).toHaveBeenCalledTimes(1);
    });
});

test('when totals are defined, request for totals are not made and only one for submissions/publications is made', async () => {
    const totalsRequest = jest.spyOn(agencyReportingAPI, 'getTotalBudgetaryResources').mockClear().mockReturnValue(mockResponses.totalsRequest);
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockClear().mockReturnValue(mockResponses.submissionsRequest);
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([{ submission_fiscal_year: 2020, submission_fiscal_month: 8 }])
    });

    render(<AgenciesContainer {...defaultProps} />);
    return waitFor(() => {
        expect(totalsRequest).toHaveBeenCalledTimes(0);
        expect(submissionsRequest).toHaveBeenCalledTimes(1);
    });
});

test('when totals are defined and the active tab changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([{ submission_fiscal_year: 2020, submission_fiscal_month: 8 }])
    });
    const publicationsRequest = jest.spyOn(agencyReportingAPI, 'getSubmissionPublicationDates').mockClear().mockReturnValue(mockResponses.publicationsRequest);
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockClear().mockReturnValue(mockResponses.submissionsRequest);
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);

    // not using click to trigger update to active tab b/c it's in a sibling component to this one.
    rerender(<AgenciesContainer {...defaultProps} activeTab="publications" />);

    return waitFor(() => {
        expect(submissionsRequest).toHaveBeenCalledTimes(1);
        expect(publicationsRequest).toHaveBeenCalledTimes(1);
    });
});

test('when totals are defined and the fy changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 },
            { submission_fiscal_year: 2018, submission_fiscal_month: 8 }
        ])
    });
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockClear().mockReturnValue(mockResponses.submissionsRequest);
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);
    rerender(<AgenciesContainer {...defaultProps} selectedFy="2018" />);

    return waitFor(() => {
        expect(submissionsRequest).toHaveBeenCalledTimes(2);
    });
});

test('when totals are defined and the period changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 },
            { submission_fiscal_year: 2020, submission_fiscal_month: 4 }
        ])
    });
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockClear().mockReturnValue(mockResponses.submissionsRequest);
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);
    rerender(<AgenciesContainer {...defaultProps} selectedPeriod="4" />);

    return waitFor(() => {
        expect(submissionsRequest).toHaveBeenCalledTimes(2);
    });
});

test('when totals are defined and the sort field changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockClear().mockReturnValue(mockResponses.submissionsRequest);
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);
    expect(submissionsRequest).toHaveBeenCalledTimes(1);

    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['test', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });

    rerender(<AgenciesContainer {...defaultProps} />);

    return waitFor(() => {
        expect(submissionsRequest).toHaveBeenCalledTimes(2);
    });
});

test('when totals are defined and the order field changes, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockClear().mockReturnValue(mockResponses.submissionsRequest);
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);

    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'asc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    rerender(<AgenciesContainer {...defaultProps} />);
    return waitFor(() => {
        // if you changes this to three the test will fail; once on mount, then only once more.
        expect(submissionsRequest).toHaveBeenCalledTimes(2);
    });
});

test('when totals are defined and the search term is defined, one request is made', () => {
    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: '',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    const submissionsRequest = jest.spyOn(agencyReportingAPI, 'getAgenciesReportingData').mockClear().mockReturnValue(mockResponses.submissionsRequest);
    const { rerender } = render(<AgenciesContainer {...defaultProps} />);

    jest.spyOn(redux, 'useSelector').mockReturnValue({
        allSubmissions: [],
        submissionsSearchResults: [],
        publicationsSearchResults: [],
        searchTerm: 'test',
        allPublications: [],
        federalTotals: [1],
        submissionsSort: ['current_total_budget_authority_amount', 'desc'],
        publicationsSort: ['current_total_budget_authority_amount', 'desc'],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    });
    rerender(<AgenciesContainer {...defaultProps} />);
    return waitFor(() => {
        // if you changes this to three the test will fail; once on mount, then only once more.
        expect(submissionsRequest).toHaveBeenCalledTimes(2);
        expect(submissionsRequest).toHaveBeenLastCalledWith('2020', '8', 'current_total_budget_authority_amount', 'desc', 1, 10, 'test');
    });
});

test('should clear a search term on unmount', () => {
    // Create a fake reducer that calls a mock function for the action type we are interested in
    const setSearchTerm = jest.fn();
    const mockReducer = (state, action) => {
        if (action.type === 'SET_ABOUT_THE_DATA_SEARCH_TERM') {
            setSearchTerm(action?.payload);
        }
    };

    // Create a mock Redux store with a search term applied
    const mockStore = {
        aboutTheData: {
            submissionsSearchResults: [],
            publicationsSearchResults: [],
            searchTerm: 'test',
            allPublications: [],
            federalTotals: [1],
            submissionsSort: ['current_total_budget_authority_amount', 'desc'],
            publicationsSort: ['current_total_budget_authority_amount', 'desc']
        },
        allSubmissions: [],
        submissionPeriods: new List([
            { submission_fiscal_year: 2020, submission_fiscal_month: 8 }
        ])
    };

    // Render a wrapped component with the mock reducer and store, then unmount it
    const { unmount } = render((
        <Provider store={createStore(mockReducer, mockStore)}>
            <AgenciesContainer {...defaultProps} />
        </Provider>
    ));
    unmount();

    return waitFor(() => {
        expect(setSearchTerm).toHaveBeenLastCalledWith('');
    });
});
