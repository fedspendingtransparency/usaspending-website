/**
 * @jest-environment jsdom
 *
 * AgencyOverview-test.jsx
 * Created by Lizzie Salita 3/26/21
 */

import React from 'react';
import { render, screen, act } from '../../testResources/test-utils';
import '../../testResources/matchMedia.mock';
import AgencyOverview from "../../../src/js/components/agency/overview/AgencyOverview";
import BaseAgencyOverview from "../../../src/js/models/v2/agency/BaseAgencyOverview";
import BaseAgencyBudgetaryResources from "../../../src/js/models/v2/agency/BaseAgencyBudgetaryResources";
import BaseAgencyRecipients from "../../../src/js/models/v2/agency/BaseAgencyRecipients";
import { mockAgency } from '../../models/agency/BaseAgencyOverview-test';
import { mockTotalBudgetaryResources } from './overview/mockData';
import {List} from "immutable";
import * as agency from 'apis/agency';
import { mockApiCall } from "../../testResources/mockApiHelper";
// eslint-disable-next-line no-unused-vars
import { useLatestAccountData } from "../../../src/js/containers/account/WithLatestFy";
// eslint-disable-next-line no-unused-vars
import useCallbackRef from "../../../src/js/hooks/useCallbackRef";

const overviewDod = Object.create(BaseAgencyOverview);
overviewDod.populate({ ...mockAgency, about_agency_data: true });
const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources.populate({ agency_data_by_year: mockTotalBudgetaryResources });
const recipientDistribution = Object.create(BaseAgencyRecipients);
recipientDistribution.populate({
    count: 12345,
    total_federal_count: 7654321
});

const mockStoreDod = {
    agency: {
        overview: overviewDod,
        budgetaryResources,
        recipientDistribution
    }
};

mockApiCall(agency, 'fetchBudgetaryResources', {
    data: {
        "toptier_code": "097",
        "agency_data_by_year": [
            {
                "fiscal_year": 2017,
                "agency_budgetary_resources": 1163404425401.68,
                "agency_total_obligated": 1014206206108.0,
                "agency_total_outlayed": 918268551866.96,
                "total_budgetary_resources": 7158037155046.72,
                "agency_obligation_by_period": [
                    {
                        "period": 6,
                        "obligated": 528288078948.38
                    },
                    {
                        "period": 9,
                        "obligated": 755345999399.89
                    },
                    {
                        "period": 12,
                        "obligated": 1014206206108.0
                    }
                ]
            }
        ],
        "messages": []
    }
});

const mockList = new List([
    {
        "period_start_date": "2026-07-01T00:00:00Z",
        "period_end_date": "2026-07-31T00:00:00Z",
        "submission_start_date": "2026-08-20T00:00:00Z",
        "submission_due_date": "2026-09-01T00:00:00Z",
        "certification_due_date": "2026-11-17T00:00:00Z",
        "submission_reveal_date": "2026-09-01T02:22:01.937580Z",
        "submission_fiscal_year": 2026,
        "submission_fiscal_quarter": 4,
        "submission_fiscal_month": 10,
        "is_quarter": false
    }
]);

jest.mock('../../../src/js/containers/account/WithLatestFy', () => ({
    useLatestAccountData: jest.fn(() => [
        "2026-07-31T00:00:00.000Z",
        mockList,
        {
            "revealDate": "2026-09-01T02:22:01.937Z",
            "asOfDate": "2026-07-31T00:00:00.000Z",
            "period": 10,
            "year": 2026,
            "quarter": 4
        },
        false,
        ""
    ])
}))

jest.mock("../../../src/js/hooks/useCallbackRef", () => jest.fn());

describe('AgencyOverview', () => {
    test('should display the \'About this Agency\'s Data\' section for DOD', async () => {
        act(() => {
            render(<AgencyOverview fy="2017" dataThroughDate="no data" />, { initialState: mockStoreDod });
        });

        const heading = screen.queryByText('About this Agency\'s Data');

        await expect(heading).toBeTruthy();
    });


    const overview = Object.create(BaseAgencyOverview);
    overview.populate(mockAgency);
    test('should not display the \'About this Agency\'s Data\' section for non-DOD', async () => {
        act(() => {
            render(<AgencyOverview fy="2017" dataThroughDate="no data" />);
        });
        const heading = screen.queryByText('About this Agency\'s Data');
        await expect(heading).toBeFalsy();
    });
});
