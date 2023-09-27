/**
 * @jest-environment jsdom
 * 
 * SummaryInsightsContainer-test.jsx
 * Created by Lizzie Salita 11/30/21
 */

import React from 'react';
import { render } from 'test-utils';
import { expect } from '@jest/globals';
import * as redux from 'react-redux';
import * as apis from 'apis/disaster';
import SummaryInsightsContainer from 'containers/covid19/SummaryInsightsContainer';
import { mockDefcParams } from '../../mockData/helpers/disasterHelper';

describe('COVID-19 Summary Insights Container', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    const mockCFDAProps = {
        activeTab: 'all',
        resultsCount: 20,
        overviewData: [
            { type: "resultsCount", title: "CFDA Programs" },
            { type: "awardObligations", title: "Award Obligations", isMonetary: true },
            { type: "awardOutlays", title: "Award Outlays", isMonetary: true },
            { type: "numberOfAwards", title: "Number of Awards" }
        ],
        assistanceOnly: true
    };
    const mockRecipientProps = {
        ...mockCFDAProps,
        assistanceOnly: false,
        recipientOnly: true
    };
    it(`should request assistance award types for the CFDA section "All Awards" tab`, async () => {
        const spy = jest.spyOn(apis, 'fetchAwardAmounts');
        render(<SummaryInsightsContainer {...mockCFDAProps} />, { initialState: { covid19: { defcParams: mockDefcParams } } });
        expect(spy).toHaveBeenCalledWith({
            filter: {
                award_type: 'assistance',
                def_codes: mockDefcParams
            }
        });
    });
    it(`should leave out the assistance award types param for other sections' "All Awards" tab`, async () => {
        const spy = jest.spyOn(apis, 'fetchAwardAmounts');

        render(<SummaryInsightsContainer {...mockRecipientProps} />, { initialState: { covid19: { defcParams: mockDefcParams } } });
        expect(spy).toHaveBeenCalledWith({
            filter: {
                def_codes: mockDefcParams
            }
        });
    });
    it(`should make a new API request when the DEFC params change`, async () => {
        const spy = jest.spyOn(apis, 'fetchAwardAmounts');
        jest.spyOn(redux, 'useSelector').mockReturnValue({
            defcParams: mockDefcParams
        });
        render(<SummaryInsightsContainer {...mockRecipientProps} />);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            filter: {
                def_codes: mockDefcParams
            }
        });
        const differentDefcParams = ['Q', 'R'];
        jest.spyOn(redux, 'useSelector').mockReturnValue({
            defcParams: differentDefcParams
        });
        render(<SummaryInsightsContainer {...mockRecipientProps} />);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenLastCalledWith({
            filter: {
                def_codes: differentDefcParams
            }
        });
    });
});
