/**
  * AwardSummary.js
  * Created by Kevin Li 11/28/16
  **/

import moment from 'moment';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import GenericRecord from '../GenericRecord';

const recordType = 'award';
const fields = [
    'id',
    'awardId',
    'recipient_name',
    'date_signed',
    'period_of_performance_start_date',
    'period_of_performance_current_end_date',
    'type',
    'type_description',
    'awarding_agency_name',
    'awarding_subtier_name',
    'awarding_office_name',
    'funding_agency_name',
    'funding_subtier_name',
    'funding_office_name',
    'recipient_street',
    'recipient_city',
    'recipient_state_province',
    'recipient_zip_postal',
    'recipient_country',
    'pop_city',
    'pop_state_province',
    'total_obligation',
    'total_funding_amount'
];

const remapData = (data, idField) => {
    // remap expected child fields to top-level fields
    const remappedData = data;
    let id = '';
    let awardType = '';
    let awardTypeDescription = '';
    let awardingAgencyName = '';
    let awardingSubtierName = '';
    let awardingOfficeName = '';
    let fundingAgencyName = '';
    let fundingSubtierName = '';
    let fundingOfficeName = '';
    let recipientName = '';
    let recipientStreet = '';
    let recipientCity = '';
    let recipientStateProvince = '';
    let recipientZipPostal = '';
    let recipientCountry = '';
    let popCity = '';
    let popStateProvince = '';
    let totalFundingAmount = '';

    if (data.id) {
        id = data.id;
    }

    if (data.type) {
        awardType = data.type;
    }

    if (data.type_description) {
        awardTypeDescription = data.type_description;
    }

    if (data.awarding_agency) {
        awardingAgencyName = data.awarding_agency.toptier_agency.name;
        awardingSubtierName = data.awarding_agency.subtier_agency.name;
        if (data.awarding_agency.office_agency) {
            awardingOfficeName = data.awarding_agency.office_agency.name;
        }
    }

    if (data.funding_agency) {
        fundingAgencyName = data.funding_agency.toptier_agency.name;
        fundingSubtierName = data.funding_agency.subtier_agency.name;
        if (data.funding_agency.office_agency) {
            fundingOfficeName = data.funding_agency.office_agency.name;
        }
    }

    if (data.place_of_performance) {
        popCity = data.place_of_performance.location_city_name;
        if (data.place_of_performance.location_state_code) {
            popStateProvince = data.place_of_performance.location_state_code;
        }
        else if (data.place_of_performance.location_foreign_province) {
            popStateProvince = data.place_of_performance.location_foreign_province;
        }
    }
    if (data.financialassistanceaward_set) {
        // totalFundingAmount = data.financialassistanceaward_set[0].total_funding_amount;
        totalFundingAmount = '1000';
    }

    remappedData.type = awardType;
    remappedData.type_description = awardTypeDescription;
    remappedData.awarding_agency_name = awardingAgencyName;
    remappedData.awarding_subtier_name = awardingSubtierName;
    remappedData.awarding_office_name = awardingOfficeName;
    remappedData.funding_agency_name = fundingAgencyName;
    remappedData.funding_subtier_name = fundingSubtierName;
    remappedData.funding_office_name = fundingOfficeName;
    remappedData.recipient_name = recipientName;
    remappedData.id = id;
    remappedData.pop_city = popCity;
    remappedData.pop_state_province = popStateProvince;
    remappedData.total_funding_amount = MoneyFormatter.formatMoney(totalFundingAmount);

    // set the awardID (fain or piid) to the relevant field
    let awardId = data.fain;
    if (!idField) {
        // unspecified ID field, use whatever value is available
        if (!data.fain && data.piid) {
            awardId = data.piid;
        }
        else if (data.uri) {
            awardId = data.uri;
        }
    }
    else {
        awardId = data[idField];
        if (!awardId) {
            awardId = '';
        }
    }
    remappedData.awardId = awardId;

    // Format address
    if (data.recipient) {
        const loc = data.recipient.location;
        recipientName = loc.recipient_name;
        recipientStreet = loc.location_address_line1 +
        loc.location_address_line2 +
        loc.location_address_line3;

        if (loc.location_city_name) {
            recipientCity = loc.location_city_name;
        }

        if (loc.location_state_code) {
            recipientStateProvince = loc.location_state_code;
        }
        else if (loc.location_foreign_province) {
            recipientStateProvince = loc.location_foreign_province;
        }

        if (loc.location_zip5) {
            recipientZipPostal = loc.location_zip5;
        }
        else if (loc.location_foreign_postal_code) {
            recipientZipPostal = loc.location_foreign_postal_code;
        }

        if (loc.location_country_code) {
            recipientCountry = loc.location_country_code;
        }
        else if (loc.location_country_name) {
            recipientCountry = loc.location_country_name;
        }
    }
    remappedData.recipient_street = recipientStreet;
    remappedData.recipient_city = recipientCity;
    remappedData.recipient_state_province = recipientStateProvince;
    remappedData.recipient_zip_postal = recipientZipPostal;
    remappedData.recipient_country = recipientCountry;

    // convert the award type code to a user-readable string
    let serverType = '';
    if (data.type_description) {
        serverType = data.type_description;
    }
    remappedData.type = serverType;

    const moneyCells = ['total_obligation'];
    moneyCells.forEach((cell) => {
        remappedData[cell] = MoneyFormatter.formatMoney(data[cell]);
    });

    // finally parse the moment object
    const dates = ['period_of_performance_start_date', 'period_of_performance_current_end_date',
        'date_signed'];
    dates.forEach((date) => {
        if (data[date]) {
            remappedData[date] = moment(data[date], 'YYYY-MM-DD').format('M/D/YYYY');
        }
        else {
            // handle null dates
            remappedData[date] = '';
        }
    });

    return remappedData;
};

class AwardSummary extends GenericRecord {
    constructor(data, idField = null) {
        const remappedData = remapData(data, idField);
        // create the object
        super(recordType, fields, remappedData);
    }
}

export default AwardSummary;
