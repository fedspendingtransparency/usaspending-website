/**
 * SpendingByCFDAContainer-test.js
 * Created by Lizzie Salita 7/02/20
 * */

import { parseRows } from 'containers/covid19/assistanceListing/SpendingByCFDAContainer';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('SpendingByCFDAContainer', () => {
    describe('parseRows', () => {
        it('should parse returned CFDA data', () => {
            const mockResults = [
                {
                    code: '43.090',
                    description: 'Description text',
                    children: [],
                    count: 5400,
                    obligation: 89000000.01,
                    outlay: 70000000.98,
                    resource_link: 'https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view'
                },
                {
                    code: '44.091',
                    description: 'Description text 2',
                    children: [],
                    count: 5401,
                    obligation: 89000001.01,
                    outlay: 70000001.98,
                    resource_link: null
                }
            ];

            const onRedirectModalClick = jest.fn();

            const expected = [
                [
                    (
                        <button
                            className="assistance-listing__button"
                            value="https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view"
                            onClick={onRedirectModalClick}>
                            43.090: Description text<FontAwesomeIcon icon="external-link-alt" />
                        </button>
                    ),
                    '$89,000,000',
                    '$70,000,001',
                    '5,400'
                ],
                [
                    '44.091: Description text 2',
                    '$89,000,001',
                    '$70,000,002',
                    '5,401'
                ]
            ];

            const parsed = parseRows(mockResults, onRedirectModalClick, 'contracts');
            expect(parsed).toEqual(expected);
        });
        it('should parse returned CFDA loans data', () => {
            const mockResults = [
                {
                    code: '43.090',
                    description: 'Description text',
                    children: [],
                    count: 5400,
                    obligation: 89000000.01,
                    outlay: 70000000.98,
                    resource_link: 'https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view',
                    face_value_of_loan: 56000001.02
                },
                {
                    code: '44.091',
                    description: 'Description text 2',
                    children: [],
                    count: 5401,
                    obligation: 89000001.01,
                    outlay: 70000001.98,
                    resource_link: null,
                    face_value_of_loan: 56000002.02
                }
            ];

            const onRedirectModalClick = jest.fn();

            const expected = [
                [
                    (
                        <button
                            className="assistance-listing__button"
                            value="https://beta.sam.gov/fal/25b529f3b5f94b6c939bc0ae8424ae6c/view"
                            onClick={onRedirectModalClick}>
                            43.090: Description text<FontAwesomeIcon icon="external-link-alt" />
                        </button>
                    ),
                    '$56,000,001',
                    '$89,000,000',
                    '$70,000,001',
                    '5,400'
                ],
                [
                    '44.091: Description text 2',
                    '$56,000,002',
                    '$89,000,001',
                    '$70,000,002',
                    '5,401'
                ]
            ];

            const parsed = parseRows(mockResults, onRedirectModalClick, 'loans');
            expect(parsed).toEqual(expected);
        });
    });
});
