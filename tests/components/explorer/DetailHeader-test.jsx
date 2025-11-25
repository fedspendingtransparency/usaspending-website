/**
 * @jest-environment jsdom
 *
 * DetailHeader-test.js
 * Created by Andrea Blackwell 12/17/2021
 * */

import React from "react";
// eslint-disable-next-line import/no-unresolved
import { renderWithoutRouter, screen } from "test-utils";
import { expect } from '@jest/globals';
import { BrowserRouter } from "react-router";
import DetailHeader from "components/explorer/detail/header/DetailHeader";
import * as useAgencySlugs from "../../../src/js/hooks/useAgencySlugs";

const mockAPIResponse = {
    results: [
        {
            toptier_code: "012",
            agency_slug: "department-of-dinosaurs",
            agency_id: "123"
        },
        {
            toptier_code: "456",
            agency_slug: "ice-cream-social",
            agency_id: "789"
        }
    ]
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('DetailHeader Component', () => {
    const renderComponent = (id) => {
        /* eslint-disable function-paren-newline */
        renderWithoutRouter(
            <BrowserRouter>
                <DetailHeader
                    activeSubdivision={null}
                    isLoading={false}
                    within="agency"
                    title="Mock Title"
                    link={null}
                    id={id}
                    fy="2021"
                    lastUpdate="2021"
                    total={1000}
                    parent={null}
                    isTruncated={false} />
            </BrowserRouter>
        );
        /* eslint-enable function-paren-newline */
    };

    it('should display the link to the agency page in the Spending Explorer header', () => {
        jest.spyOn(useAgencySlugs, "default").mockImplementation(() => ([
            {},
            {},
            {
                123: 'department-of-dinosaurs',
                789: 'ice-cream-social'
            },
            false,
            false
        ]));

        renderComponent(mockAPIResponse.results[0].agency_id);

        expect(screen.getByText('Mock Title')).toHaveAttribute('href', '/agency/department-of-dinosaurs');
    });
});
