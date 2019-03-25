/**
 * AwardMetaDataContainer-test.js
 * Created by Max Kendall 2/21/19
 * */

import React from "react";
import { shallow } from "enzyme";

import { AwardMetaDataContainer } from "../../../../src/js/containers/awardV2/idv/AwardMetaDataContainer";
import { mockRedux } from "../mockAward";
import { mockAwardFundingMetaData } from "../../../models/awardsV2/mockAwardApi";

jest.mock("helpers/idvHelper", () => require("./mockIdvHelper"));

describe("AwardMetaDataContainer", () => {
    let container;
    beforeEach(() => {
        container = shallow(<AwardMetaDataContainer {...mockRedux} />);
    });

    it("calls class method to update state on componentDidMount", async () => {
        const mockUpdateSummaryData = jest.fn();
        container.instance().updateSummaryData = mockUpdateSummaryData;
        await container.instance().componentDidMount();
        expect(mockUpdateSummaryData).toHaveBeenCalledWith(mockAwardFundingMetaData);
    });
    it("then updates state with payload from API", async () => {
        await container.instance().componentDidMount();
        const { state } = container.instance();
        expect(state.totalTransactionObligatedAmount).toEqual(mockAwardFundingMetaData.total_transaction_obligated_amount);
        expect(state.awardingAgencyCount).toEqual(mockAwardFundingMetaData.awarding_agency_count);
        expect(state.federalAccountCount).toEqual(mockAwardFundingMetaData.federal_account_count);
    });
});
