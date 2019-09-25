import _ from 'lodash';
import awardReducer from 'redux/reducers/award/awardReducer';

import { mockAwardResponse, mockTransactions } from './mockAward';

const initialState = {
    selectedAward: null
};

it('should return the initial state by default', () => {
    expect(awardReducer(undefined, {})).toEqual(initialState);
});

describe('SET_SELECTED_AWARD', () => {
    it('should save the returned award to redux state', () => {
        const action = {
            type: 'SET_SELECTED_AWARD',
            selectedAward: {
                id: 8914,
                award_id: "DEAC0500OR22725",
                recipient_name: "UT BATTELLE LIMITED LIABILITY COMPANY",
                description: "MANAGEMENT AND OPERATION OF THE OAK RIDGE NATIONAL LABORATORY - TAS::97 0400::TAS - OBLIGATE SPP DOD FUNDING - OCTOBER 27 2016",
                date_signed: "10/9/2014",
                period_of_performance_start_date: "10/9/2014",
                period_of_performance_current_end_date: "3/31/2020",
                award_type: "D",
                type: "Definitive Contract",
                type_description: "Definitive Contract",
                awarding_agency_name: "ENERGY, DEPARTMENT OF",
                awarding_subtier_name: "ENERGY, DEPARTMENT OF",
                funding_agency_name: "DEPT OF DEFENSE",
                funding_subtier_name: "DEPT OF DEFENSE",
                recipient_street: "BETHEL VALLEY ROAD",
                recipient_city: "OAK RIDGE",
                recipient_state_province: "TN",
                recipient_zip_postal: "37831",
                recipient_country: "UNITED STATES",
                pop_city: null,
                pop_state_province: "TN",
                pop_zip: "37830",
                total_obligation: "$524,325,656",
                base_and_all_options_value: "$1,537,201",
                recipient_duns: "099114287",
                recipient_parent_duns: "099114287",
                recipient_business_type: "Unknown Business Type",
                type_of_contract_pricing: "R",
                type_of_contract_pricing_description: ""
            }
        };
        const updatedState = awardReducer(initialState, action);
        // the value should be equal
        expect(updatedState.selectedAward).toEqual(action.selectedAward);
    });
});
