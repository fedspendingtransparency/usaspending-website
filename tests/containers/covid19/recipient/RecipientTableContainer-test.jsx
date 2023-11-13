/**
 * @jest-environment jsdom
 * 
 * RecipientTableContainer-test.js
 * Created by Lizzie Salita 7/17/20
 * */

import React from 'react';
import { render, waitFor, screen, fireEvent, act } from 'test-utils';
import { expect } from '@jest/globals';
import { Link } from 'react-router-dom';
import RecipientTableContainer, { parseRows } from 'containers/covid19/recipient/RecipientTableContainer';
import * as api from 'apis/disaster';
import * as redux from 'react-redux';
import { defaultState } from '../../../testResources/defaultReduxFilters';

// Mock the child component so we can isolate functionality of the container
jest.mock('containers/covid19/SummaryInsightsContainer', () =>
    jest.fn(() => null));

const mockResults = [
    {
        code: "987654321",
        award_count: 2,
        description: "RECIPIENT 3",
        id: ["d2894d22-67fc-f9cb-4005-33fa6a29ef86-C", "d2894d22-67fc-f9cb-4005-33fa6a29ef86-R"],
        obligation: 2200.0,
        outlay: 1100.0
    },
    {
        code: "456789123",
        award_count: 1,
        description: "RECIPIENT 2",
        id: ["3c92491a-f2cd-ec7d-294b-7daf91511866-R"],
        obligation: 20.0,
        outlay: 0.0
    }
];

let spy;

beforeEach(() => {
    jest.clearAllMocks();
});

describe('RecipientTableContainer', () => {
    describe('parseRows', () => {
        it('should parse returned recipient data', () => {
            const expected = [
                [
                    (
                        <>
                            {mockResults[0].description}&nbsp;(
                            <Link to="/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-C/latest">
                                as Child
                            </Link>,&nbsp;
                            <Link to="/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-R/latest">
                                as Recipient
                            </Link>
                            )
                        </>
                    ),
                    '$2,200',
                    '$1,100',
                    '2'
                ],
                [
                    (
                        <Link to="/recipient/3c92491a-f2cd-ec7d-294b-7daf91511866-R/latest">
                            RECIPIENT 2
                        </Link>
                    ),
                    '$20',
                    '$0',
                    '1'
                ]
            ];
    
            const parsed = parseRows(mockResults, 'all', '');
            // using toMatchObject for equality comparison that is more lenient than toEqual https://jestjs.io/docs/en/expect#tomatchobjectobject
            expect([...parsed]).toMatchObject(expected);
            
        });
        it('should parse returned recipient loans data', () => {
            const mockLoanResults = [
                {
                    code: "987654321",
                    award_count: 2,
                    description: "RECIPIENT 3",
                    face_value_of_loan: 100.0,
                    id: ["d2894d22-67fc-f9cb-4005-33fa6a29ef86-C", "d2894d22-67fc-f9cb-4005-33fa6a29ef86-R"],
                    obligation: 2200.0,
                    outlay: 1100.0
                },
                {
                    code: "456789123",
                    award_count: 1,
                    description: "RECIPIENT 2",
                    face_value_of_loan: 200.0,
                    id: ["3c92491a-f2cd-ec7d-294b-7daf91511866-R"],
                    obligation: 20.0,
                    outlay: 0.0
                }
            ];

            const expected = [
                [
                    (
                        <>
                            {mockLoanResults[0].description}&nbsp;(
                            <Link to="/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-C/latest">
                                as Child
                            </Link>,&nbsp;
                            <Link to="/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-R/latest">
                                as Recipient
                            </Link>
                            )
                        </>
                    ),
                    '$2,200',
                    '$1,100',
                    '$100',
                    '2'
                ],
                [
                    (
                        <Link to="/recipient/3c92491a-f2cd-ec7d-294b-7daf91511866-R/latest">
                            RECIPIENT 2
                        </Link>
                    ),
                    '$20',
                    '$0',
                    '$200',
                    '1'
                ]
            ];
            
            const parsed = parseRows(mockLoanResults, 'loans', '');
            expect([...parsed]).toMatchObject(expected);
        });
    });
    describe('table interactions', () => {
        beforeEach(() => {
            // Mock the relevant redux state
            jest.spyOn(redux, 'useSelector').mockReturnValue({
                defcParams: ['A', 'B', 'C'],
                recipientTotals: {
                    obligation: 2026286145590.02,
                    outlay: 1604723759880.31,
                    awardCount: 21639525
                }
            });
        });
        it('should make an API call when the sort changes', () => {
            // spy on the API request helper function
            spy = jest.spyOn(api, 'fetchDisasterSpending').mockReturnValue({
                promise: Promise.resolve({
                    data: {
                        results: mockResults,
                        page_metadata: {
                            total: 20
                        }
                    }
                }),
                cancel: jest.fn()
            });
            // Initial render
            act(() => {
                render(<RecipientTableContainer activeTab="all" prevActiveTab="all" scrollIntoView={jest.fn()} />);
            });
            expect(spy).toHaveBeenCalledTimes(2);
            // Click a sort button
            fireEvent.click(screen.getByTitle('Sort table by ascending Recipient'));
            return waitFor(() => {
                expect(spy).toHaveBeenCalledTimes(3);
            });
        });
        it('should make an API call when a search term is applied', () => {
            // spy on the API request helper function
            spy = jest.spyOn(api, 'fetchDisasterSpending').mockReturnValue({
                promise: Promise.resolve({
                    data: {
                        results: mockResults,
                        page_metadata: {
                            total: 20
                        }
                    }
                }),
                cancel: jest.fn()
            });
            // Initial render
            act(() => {
                render(<RecipientTableContainer activeTab="all" prevActiveTab="all" scrollIntoView={jest.fn()} />);
            });
            expect(spy).toHaveBeenCalledTimes(2);
            // Enter a search term
            const input = screen.getByTitle('Search Input');
            const button = screen.getByTitle('Submit Search Button');
            fireEvent.change(input, { target: { value: 'hello' } });
            fireEvent.click(button);
            return waitFor(() => {
                expect(spy).toHaveBeenCalledTimes(3);
            });
        });
        it('should make a different API call when the loans tab is active', () => {
            // spy on the API request helper functions
            spy = jest.spyOn(api, 'fetchDisasterSpending');
            const loansSpy = jest.spyOn(api, 'fetchLoanSpending').mockReturnValue({
                promise: Promise.resolve({
                    data: {
                        results: mockResults,
                        page_metadata: {
                            total: 20
                        }
                    }
                }),
                cancel: jest.fn()
            });
            // Initial render
            act(() => {
                render(<RecipientTableContainer activeTab="loans" prevActiveTab="loans" scrollIntoView={jest.fn()} />);
            });
            expect(spy).not.toHaveBeenCalled();
            expect(loansSpy).toHaveBeenCalledTimes(2);
        });
        it('should make an API call when the active tab changes', () => {
            // spy on the API request helper functions
            spy = jest.spyOn(api, 'fetchDisasterSpending').mockReturnValue({
                promise: Promise.resolve({
                    data: {
                        results: mockResults,
                        page_metadata: {
                            total: 20
                        }
                    }
                }),
                cancel: jest.fn()
            });

            const { rerender } = render(<RecipientTableContainer activeTab="loans" prevActiveTab="loans" scrollIntoView={jest.fn()} />);
            waitFor(() => {
                expect(spy).toHaveBeenCalledTimes(2);
            });
            rerender(<RecipientTableContainer activeTab="all" prevActiveTab="loans" scrollIntoView={jest.fn()} />);
            waitFor(() => {
                expect(spy).toHaveBeenCalledTimes(3);
            });
        });
    });

    it('should make an API call when the DEFC params change', () => {
        // spy on the API request helper functions
        spy = jest.spyOn(api, 'fetchDisasterSpending').mockReturnValue({
            promise: Promise.resolve({
                data: {
                    results: mockResults,
                    page_metadata: {
                        total: 20
                    }
                }
            }),
            cancel: jest.fn()
        });

        const { rerender } = render(
            (
                <RecipientTableContainer
                    activeTab="all"
                    prevActiveTab="all"
                    scrollIntoView={jest.fn()} />
            ), {
                initialState: {
                    ...defaultState,
                    covid19: {
                        defcParams: ['A', 'B', 'C'],
                        recipientTotals: {
                            obligation: 2026286145590.02,
                            outlay: 1604723759880.31,
                            awardCount: 21639525
                        }
                    }
                }
            }
        );
        waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
        // re-render with different defcParams
        rerender(
            (
                <RecipientTableContainer
                    activeTab="all"
                    prevActiveTab="all"
                    scrollIntoView={jest.fn()} />
            ), {
                initialState: {
                    ...defaultState,
                    covid19: {
                        defcParams: ['Z'],
                        recipientTotals: {
                            obligation: 2026286145590.02,
                            outlay: 1604723759880.31,
                            awardCount: 21639525
                        }
                    }
                }
            }
        );
        waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
});
