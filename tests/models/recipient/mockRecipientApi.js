/**
 * @jest-environment jsdom
 * 
 * mockRecipientApi.js
 * Created by Lizzie Salita 6/25/18
 */

export const mockRecipientOverview = {
    recipient_id: '0123456-ABC-P',
    name: 'The ABC Corporation',
    alternateNames: ['The ABC Corp', 'ABC Corporation, The'],
    duns: '0123456',
    parent_name: 'The XYZ Corporation',
    parent_duns: '0987654',
    parent_id: '0987654-XYZ-P',
    location: {
        address_line1: '123 Sesame St',
        city_name: 'McLean',
        state_code: 'VA',
        zip: '22102',
        country_name: null,
        country_code: 'USA',
        congressional_code: '05'
    },
    business_types: ['minority_owned_business', 'higher_education'],
    total_transaction_amount: 30020000000,
    total_transactions: 327721,
    recipient_level: 'P',

    // TODO: update the below face value loan variable names once backend creates them
    total_face_value_loan_amount: 123123123,
    total_face_value_loan_transactions: 2
};

export const mockChildRecipients = [
    {
        recipient_id: '345678-ABC-C',
        name: "Child of ABC Corporation",
        duns: "345678",
        state_province: "New Jersey",
        amount: 30020000
    },
    {
        recipient_id: '654321-ABC-C',
        name: "Another Child of ABC Corporation",
        duns: "654321",
        state_province: "Tennessee",
        amount: 40020000
    }
];
