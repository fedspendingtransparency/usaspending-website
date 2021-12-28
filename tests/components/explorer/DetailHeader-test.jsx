/**
 * DetailHeader-test.js
 * Created by Andrea Blackwell 12/17/2021
 * */

import React from "react";
import { render, screen } from "test-utils";
import "@testing-library/jest-dom/extend-expect";
import DetailHeader from "components/explorer/detail/header/DetailHeader";
import * as hooks from "containers/agencyV2/WithAgencySlugs";
import * as constants from "GlobalConstants";
import { BrowserRouter } from "react-router-dom";

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
        render(<BrowserRouter>
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
        </BrowserRouter>);
    };

    it('should display the link to the agency v2 page in the Spending Explorer header', () => {
        // Mock the Global Constants
        constants.AGENCYV2_RELEASED = true;
        constants.AGENCY_LINK = "agency_v2";

        jest.spyOn(hooks, "useAgencySlugs").mockReturnValue([
            {},
            {},
            {
                "123": 'department-of-dinosaurs',
                "789": 'ice-cream-social'
            },
            false,
            false
        ]);

        renderComponent(mockAPIResponse.results[0].agency_id);

        expect(screen.getByText('Mock Title')).toHaveAttribute('href', '/agency_v2/department-of-dinosaurs');
    });

    it('should display the link to the agency v1 page in the Spending Explorer header', () => {
        // Mock the Global Constants
        constants.AGENCYV2_RELEASED = false;
        constants.AGENCY_LINK = "agency";

        jest.spyOn(hooks, "useAgencySlugs").mockReturnValue([
            {},
            {},
            {
                "123": 'department-of-dinosaurs',
                "789": 'ice-cream-social'
            },
            false,
            false
        ]);

        renderComponent(mockAPIResponse.results[0].agency_id);

        expect(screen.getByText('Mock Title')).toHaveAttribute('href', '/agency/123');
    });

    it('when fail to load the slug should display the link to the agency v1 page in the Spending Explorer header', () => {
        // Mock the Global Constants
        constants.AGENCYV2_RELEASED = true;
        constants.AGENCY_LINK = "agency_v2";

        jest.spyOn(hooks, "useAgencySlugs").mockReturnValue([
            {},
            {},
            {
                "123": 'department-of-dinosaurs',
                "789": 'ice-cream-social'
            },
            false,
            true
        ]);

        renderComponent(mockAPIResponse.results[0].agency_id);

        expect(screen.getByText('Mock Title')).toHaveAttribute('href', '/agency/123');
    });
});
