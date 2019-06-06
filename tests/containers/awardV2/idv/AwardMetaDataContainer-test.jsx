/**
 * AwardMetaDataContainer-test.js
 * Created by Max Kendall 2/21/19
 * */

import React from "react";
import { mount, shallow } from "enzyme";

import { AwardMetaDataContainer } from "../../../../src/js/containers/awardV2/idv/AwardMetaDataContainer";
import { mockAwardFundingMetaData } from "../../../models/awardsV2/mockAwardApi";

jest.mock("helpers/idvHelper", () => require("./mockIdvHelper"));

describe("AwardMetaDataContainer", () => {
    const mockGetAwardMetaData = jest.fn();
    const getAllFederalAccounts = jest.fn();
    const getFederalAccounts = jest.fn();

    it("componentDidMount -- makes api call then updates state", async () => {
        const container = mount(<AwardMetaDataContainer awardId="123" />);
        container.instance().getAllFederalAccounts = getAllFederalAccounts;
        container.instance().getFederalAccounts = getFederalAccounts;
        await container.instance().componentDidMount();
        const { state } = container.instance();
        expect(state.totalTransactionObligatedAmount)
            .toEqual(mockAwardFundingMetaData.total_transaction_obligated_amount);
        expect(state.awardingAgencyCount).toEqual(mockAwardFundingMetaData.awarding_agency_count);
        expect(state.federalAccountCount).toEqual(mockAwardFundingMetaData.federal_account_count);
        expect(getAllFederalAccounts).toHaveBeenCalled();
        expect(getFederalAccounts).toHaveBeenCalled();
    });

    it("componentDidUpdate -- makes api call w/ new award id", async () => {
        const container = mount(<AwardMetaDataContainer awardId="123" />);
        container.instance().getAwardMetaData = mockGetAwardMetaData;
        container.instance().getAllFederalAccounts = getAllFederalAccounts;
        container.instance().getFederalAccounts = getFederalAccounts;
        container.setProps({ awardId: "456" });
        expect(container.instance().getAwardMetaData).toHaveBeenCalled();
        expect(container.instance().getAllFederalAccounts).toHaveBeenCalled();
        expect(container.instance().getFederalAccounts).toHaveBeenCalled();
    });

    it('updateSort -- should update the sort & order state & fetch sorted accounts', async () => {
        const container = shallow(<AwardMetaDataContainer awardId="123" />);
        container.instance().getFederalAccounts = getFederalAccounts;
        container.instance().updateSort('account_title', 'asc');

        const { state } = container.instance();

        expect(state.sort).toEqual('account_title');
        expect(state.order).toEqual('asc');
        expect(container.instance().getFederalAccounts).toHaveBeenCalled();
    });

    it('changePage -- should update the page state & fetch more accounts', async () => {
        const container = shallow(<AwardMetaDataContainer awardId="123" />);
        container.instance().getFederalAccounts = getFederalAccounts;
        container.instance().changePage(2);

        expect(container.instance().state.page).toEqual(2);
        expect(container.instance().getFederalAccounts).toHaveBeenCalled();
    });
});
