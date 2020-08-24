/**
 * SpendingByRecipientContainer-test.js
 * Created by Lizzie Salita 7/17/20
 * */

import { parseRows, generateDescription } from 'containers/covid19/recipient/SpendingByRecipientContainer';
import React from 'react';

describe('SpendingByRecipientContainer', () => {
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
    describe('parseRows', () => {
        it('should parse returned recipient data', () => {
            const expected = [
                [
                    (
                        <>
                            {mockResults[0].description}&nbsp;(
                            <a href="#/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-C">
                                as Child
                            </a>,&nbsp;
                            <a href="#/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-R">
                                as Recipient
                            </a>
                            )
                        </>
                    ),
                    '$2,200',
                    '$1,100',
                    '2'
                ],
                [
                    (
                        <a href="#/recipient/3c92491a-f2cd-ec7d-294b-7daf91511866-R">
                            RECIPIENT 2
                        </a>
                    ),
                    '$20',
                    '$0',
                    '1'
                ]
            ];

            const parsed = parseRows(mockResults, 'all', '');
            expect(parsed).toEqual(expected);
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
                            <a href="#/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-C">
                                as Child
                            </a>,&nbsp;
                            <a href="#/recipient/d2894d22-67fc-f9cb-4005-33fa6a29ef86-R">
                                as Recipient
                            </a>
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
                        <a href="#/recipient/3c92491a-f2cd-ec7d-294b-7daf91511866-R">
                            RECIPIENT 2
                        </a>
                    ),
                    '$20',
                    '$0',
                    '$200',
                    '1'
                ]
            ];

            const parsed = parseRows(mockLoanResults, 'loans', '');
            expect(parsed).toEqual(expected);
        });
    });
});
