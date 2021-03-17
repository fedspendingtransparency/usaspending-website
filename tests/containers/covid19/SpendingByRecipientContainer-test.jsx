/**
 * SpendingByRecipientContainer-test.js
 * Created by Lizzie Salita 7/17/20
 * */

import React from 'react';
import { Link } from 'react-router-dom';

import { parseRows, generateDescription } from 'containers/covid19/recipient/SpendingByRecipientContainer';

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
});
