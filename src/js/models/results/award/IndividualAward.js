/**
  * IndividualAward.js
  * Created by Emily Gullo 01/31/2017
  **/

import moment from 'moment';

import GenericRecord from '../GenericRecord';

const recordType = 'award';
const fields = [
    'id',
    'recipient_name',
    'date_signed',
    'period_of_performance_start_date',
    'period_of_performance_current_end_date',
    'type',
    'awarding_agency_name',
    'awarding_subtier_name',
    'awarding_office_name',
    'funding_agency_name',
    'funding_subtier_name',
    'funding_office_name',
    'recipient_line1',
    'recipient_line2',
    'recipient_line3',
    'recipient_city',
    'recipient_state',
    'recipient_zip',
    'recipient_country',
    'recipient_foreign_provice',
    'recipient_foreign_postal_code'
];

const remapData = (data, idField) => {
    // remap expected child fields to top-level fields
    const remappedData = data;
    let awardingAgencyName = '';
    let awardingSubtierName = '';
    let awardingOfficeName = '';
    let fundingAgencyName = '';
    let fundingSubtierName = '';
    let fundingOfficeName = '';
    let recipientName = '';
    let recipientLine1 = '';
    let recipientLine2 = '';
    let recipientLine3 = '';
    let recipientCity = '';
    let recipientState = '';
    let recipientZipCode = '';
    let recipientCountry = '';
    let recipientProvince = '';
    let recipientPostalCode = '';

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

    if (data.recipient) {
        recipientName = data.recipient.recipient_name;
        recipientLine1 = data.recipient.location.location_address_line1;
        recipientLine2 = data.recipient.location.location_address_line2;
        recipientLine3 = data.recipient.location.location_address_line3;
        recipientCity = data.recipient.location.location_city_name;
        recipientState = data.recipient.location.location_state_code;
        recipientZipCode = data.recipient.location.location_zip5;
        recipientCountry = data.recipient.location.location_country_code;
        recipientProvince = data.recipient.location.location_foreign_provice;
        recipientPostalCode = data.recipient.location.location_foreign_postal_code;
    }
    remappedData.awarding_agency_name = awardingAgencyName;
    remappedData.awarding_subtier_name = awardingSubtierName;
    remappedData.awarding_office_name = awardingOfficeName;
    remappedData.funding_agency_name = fundingAgencyName;
    remappedData.funding_subtier_name = fundingSubtierName;
    remappedData.funding_office_name = fundingOfficeName;
    remappedData.recipient_name = recipientName;
    remappedData.recipient_line1 = recipientLine1;
    remappedData.recipient_line2 = recipientLine2;
    remappedData.recipient_line3 = recipientLine3;
    remappedData.recipient_city = recipientCity;
    remappedData.recipient_state = recipientState;
    remappedData.recipient_zip = recipientZipCode;
    remappedData.recipient_country = recipientCountry;
    remappedData.recipient_foreign_provice = recipientProvince;
    remappedData.recipient_foreign_postal_code = recipientPostalCode;

    // set the ID to the relevant field
    let id = data.fain;
    if (!idField) {
        // unspecified ID field, use whatever value is available
        if (!data.fain && data.piid) {
            id = data.piid;
        }
        else if (data.uri) {
            id = data.uri;
        }
    }
    else {
        id = data[idField];
        if (!id) {
            id = '';
        }
    }
    remappedData.id = id;

    // convert the award type code to a user-readable string
    let serverType = '';
    if (data.type_description) {
        serverType = data.type_description;
    }
    remappedData.type = serverType;

    // finally parse the moment object
    const dates = ['period_of_performance_start_date',
        'period_of_performance_current_end_date', 'date_signed'];
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
