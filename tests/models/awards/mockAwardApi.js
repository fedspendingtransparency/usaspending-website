/**
 * mockAwardApi.js
 * Created by Lizzie Salita 3/20/18
 */

export const mockContractApi = {
    category: 'contract',
    base_and_all_options_value: 1023.75,
    total_obligation: 1023.1,
    awarding_agency: {
        toptier_agency: {
            name: 'Department of Sandwiches'
        },
        subtier_agency: {
            name: 'Department of Subs'
        }
    },
    latest_transaction: {
        contract_data: {
            idv_type: 'mock idv type',
            contract_award_type_desc: 'mock contract type',
            awarding_office_name: 'Office of Cheesesteak',
            product_or_service_code: 'psc',
            product_or_service_co_desc: 'product/service description',
            naics: 'naics',
            naics_description: null,
            clinger_cohen_act_planning: null
        }
    },
    place_of_performance: {
        city_name: 'Pawnee',
        county_name: 'Wamapoke',
        state_code: 'IN',
        state: 'Indiana',
        zip5: '12345',
        congressional_code: '04'
    },
    recipient: {
        legal_entity_id: '11111',
        recipient_name: 'Entertainment 720',
        recipient_unique_id: 'ABC123',
        business_types_description: null,
        nonprofit_organization: true,
        minority_owned_business: true,
        location: {
            address_line1: '602 Trumball Street',
            address_line2: 'Apt 2',
            city_name: 'Pawnee',
            state_code: 'IN',
            zip5: '12345'
        },
        officers: {
            officer_1_name: 'George Washington',
            officer_1_amount: '9000.00',
            officer_2_name: 'John Adams',
            officer_2_amount: '7000.99',
            officer_3_name: 'Thomas Jefferson',
            officer_3_amount: '6000.01',
            officer_4_name: 'James Madison',
            officer_4_amount: '5000.00'
        }
    }
};

export const mockLoanApi = {
    category: 'loans',
    total_subsidy_cost: '1005.62',
    total_loan_value: '1023.4',
    awarding_agency: {
        toptier_agency: {
            name: 'Department of Sandwiches'
        },
        subtier_agency: {
            name: 'Department of Subs'
        }
    },
    latest_transaction: {
        assistance_data: {
            awarding_office_name: 'Office of Cheesesteak',
            cfda_number: '789',
            cfda_title: 'Mock CFDA Title'
        }
    },
    place_of_performance: {
        city_name: 'Pawnee',
        county_name: 'Wamapoke',
        state_code: 'IN',
        state: 'Indiana',
        zip5: '12345',
        congressional_code: '04'
    },
    recipient: {
        legal_entity_id: '11111',
        recipient_name: 'Entertainment 720',
        recipient_unique_id: 'ABC123',
        location: {
            address_line1: '602 Trumball Street',
            address_line2: 'Apt 2',
            city_name: 'Pawnee',
            state_code: 'IN',
            zip5: '12345'
        }
    }
};