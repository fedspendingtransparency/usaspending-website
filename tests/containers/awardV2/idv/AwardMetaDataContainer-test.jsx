/**
 * AwardMetaDataContainer-test.js
 * Created by Max Kendall 2/21/19
 * */

import React from "react";
import { mount } from "enzyme";

import { AwardMetaDataContainer } from "../../../../src/js/containers/awardV2/idv/AwardMetaDataContainer";
import { mockAwardFundingMetaData } from "../../../models/awardsV2/mockAwardApi";

jest.mock("helpers/idvHelper", () => require("./mockIdvHelper"));

describe("AwardMetaDataContainer", () => {
    let container;
    const mockGetAwardMetaData = jest.fn();

    beforeEach(() => {
        container = mount(<AwardMetaDataContainer awardId="123" />);
    });

    it("componentDidMount -- makes api call then updates state", async () => {
        await container.instance().componentDidMount();
        const { state } = container.instance();

        expect(state.totalTransactionObligatedAmount).toEqual(mockAwardFundingMetaData.total_transaction_obligated_amount);
        expect(state.awardingAgencyCount).toEqual(mockAwardFundingMetaData.awarding_agency_count);
        expect(state.federalAccountCount).toEqual(mockAwardFundingMetaData.federal_account_count);
    });

    it("componentDidUpdate -- makes api call w/ new award id", async () => {
        container.instance().getAwardMetaData = mockGetAwardMetaData;
        container.setProps({ awardId: "456" });
        expect(mockGetAwardMetaData).toHaveBeenCalled();
    });
});
