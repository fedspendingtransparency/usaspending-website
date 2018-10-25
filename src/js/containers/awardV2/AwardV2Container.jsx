/**
  * AwardContainer.jsx
  * Created by David Trinh 10/5/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import Award from 'components/awardv2/AwardV2';

import * as SearchHelper from 'helpers/searchHelper';
import * as awardActions from 'redux/actions/award/awardActions';

import BaseContract from 'models/v2/awardsV2/BaseContract';
import BaseFinancialAssistance from 'models/v2/awardsV2/BaseFinancialAssistance';

require('pages/awardV2/awardPage.scss');


const propTypes = {
    setSelectedAward: PropTypes.func,
    params: PropTypes.object,
    award: PropTypes.object
};

export class AwardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.awardRequest = null;

        this.state = {
            noAward: false,
            inFlight: false
        };
    }

    componentDidMount() {
        this.getSelectedAward(this.props.params.awardId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.awardId !== prevProps.params.awardId) {
            this.getSelectedAward(prevProps.params.awardId);
        }
    }

    componentWillUnmount() {
        if (this.awardRequest) {
            this.awardRequest.cancel();
        }
    }

    getSelectedAward(id) {
        if (this.awardRequest) {
            // A request is currently in-flight, cancel it
            this.awardRequest.cancel();
        }


        const awardData = {
            type: 'A',
            category: 'contract',
            type_description: 'Testing 123',
            description: 'MANAGEMENT AND OPERATION OF SANDIA NATIONAL LABORATORIES BY SANDIA CORPORATION, CONTRACT NO. DE-AC04-94AL85000',
            piid: '34242',
            parent_award_piid: '1301',
            total_obligation: 3510000000,
            base_and_all_options_value: 26510000000,
            base_exercised_options: 12690000000,
            subaward_count: 2342334,
            total_subaward_amount: 3242342,
            funding_obligated: 2000000000,
            awarding_agency: {
                toptier_agency: {
                    name: "Department of Defense",
                    abbreviation: "DOD"
                },
                subtier_agency: {
                    name: 'Department of Navy',
                    abbreviation: 'DON'
                },
                office_agency_name: 'STRATEGIC SYSTEMS'
            },
            funding_agency: null,
            recipient: {
                recipient_name: 'Booz Allen Hamilton',
                recipient_unique_id: '9a277fc5-50fc-685f-0f77-be0d96420a17-C',
                parent_recipient_unique_id: 234242,
                location: {
                    address_line1: '1515 EUBANK BLVD. SE',
                    address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
                    address_line3: null,
                    foreign_province: 'NM',
                    city_name: 'ALBUQUERQUE',
                    county_name: null,
                    state_code: 'IL',
                    zip4: '871230180',
                    zip5: null,
                    foreign_postal_code: null,
                    country_name: 'UNITED STATES',
                    location_country_code: null,
                    congressional_code: null
                },
                recipient_parent_name: 'HoneyWell',
                business_categories_name: ['Testing 1', 'Testing 2']
            },
            period_of_performance: {
                period_of_performance_start_date: `2021-04-30`,
                period_of_performance_current_end_date: `2022-04-30`,
                action_date: `2016-12-16`,
                last_modified_date: `2018-08-29`,
                potential_end_date: `2027-04-30`
            },
            place_of_performance: {
                address_line1: '1515 EUBANK BLVD. SE',
                    address_line2: 'P.O. BOX 5800, MS-0180, 87185-0180',
                    address_line3: null,
                    foreign_province: 'NM',
                    city_name: 'ALBUQUERQUE',
                    county_name: null,
                    state_code: 'IL',
                    zip4: '871230180',
                    zip5: null,
                    foreign_postal_code: null,
                    country_name: 'UNITED STATES',
                    location_country_code: null,
                    congressional_code: null
            },
            latest_transaction_contract_data: {
                idv_type_description: `test`,
                type_of_idc_description: `r3w`,
                referenced_idv_agency_iden: `424`,
                multiple_or_single_aw_desc: `testing`,
                solicitation_identifier: `DE-2342-323-SOL`,
                solicitation_procedures: `Quote`,
                number_of_offers_received: `4`,
                extent_competed: `Full`,
                other_than_full_and_o_desc: `none`,
                type_set_aside_description: `No set aside used`,
                commercial_item_acquisitio: `COMMERCIAL ITEM`,
                commercial_item_test_desc: `PROCEDURE NOT USED`,
                evaluated_preference_desc: `NO`,
                fed_biz_opps_description: `No Preference Used`,
                small_business_competitive: `Yes`,
                fair_opportunity_limi_desc: `test`,
                product_or_service_code: `t324242`,
                product_or_service_co_desc: `423we`,
                naics: `35353`,
                naics_description: null,
                dod_claimant_program_code: `ERWRWRWR5242-242`,
                program_system_or_equipmen: `unknown`,
                information_technolog_desc: `ERWRWRWR5242-242`,
                sea_transportation_desc: `seaworld`,
                clinger_cohen_act_pla_desc: null,
                construction_wage_rat_desc: `TES`,
                labor_standards_descrip: `NO`,
                materials_supplies_descrip: `YES`,
                cost_or_pricing_data_desc: `No`,
                domestic_or_foreign_e_desc: `U.S. Owned`,
                foreign_funding_desc: `Yes`,
                interagency_contract_desc: `Company A`,
                major_program: `None used`,
                price_evaluation_adjustmen: `0.00`,
                program_acronym: `NOT SURE`,
                subcontracting_plan: `PLAN`,
                multi_year_contract_desc: `No`,
                purchase_card_as_paym_desc: `Yes`,
                consolidated_contract_desc: `NO`,
                type_of_contract_pric_desc: `FIRM FIXED PRICE`
            },
            executive_details: {
                officers: [{
                    name: "John Doe",
                    amount: 12132
                }, {
                    name: "Jake Doe",
                    amount: 23432
                }]
            }
        }
        
                this.parseAward(awardData);

        // this.setState({
        //     inFlight: true
        // });

        // this.awardRequest = SearchHelper.fetchAwardV2(id);

        // this.awardRequest.promise
        //     .then((results) => {
        //         const awardData = results.data;

        //         this.setState({
        //             inFlight: false
        //         });

        //         this.parseAward(awardData);

        //         // operation has resolved
        //         this.awardRequest = null;
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         if (isCancel(error)) {
        //             // Got cancelled
        //         }
        //         else if (error.response) {
        //             // Errored out but got response, toggle noAward flag
        //             this.awardRequest = null;
        //             this.setState({
        //                 noAward: true
        //             });
        //         }
        //         else {
        //             // Request failed
        //             this.awardRequest = null;
        //             console.log(error);
        //         }
        //     });
    }

    parseAward(data) {
        this.setState({
            noAward: false
        });

        if (data.category === 'contract') {
            const contract = Object.create(BaseContract);
            contract.populate(data);
            this.props.setSelectedAward(contract);
        }
        else {
            const financialAssistance = Object.create(BaseFinancialAssistance);
            financialAssistance.populate(data);
            this.props.setSelectedAward(financialAssistance);
        }
    }

    render() {
        return (
            <Award
                {...this.props}
                id={this.props.params.awardId}
                inFlight={this.state.inFlight}
                noAward={this.state.noAward} />
        );
    }
}

AwardContainer.propTypes = propTypes;

export default connect(
    (state) => ({ award: state.award }),
    (dispatch) => bindActionCreators(awardActions, dispatch)
)(AwardContainer);
