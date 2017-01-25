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
    'recipient_name',
    'period_of_performance_start_date',
    'period_of_performance_current_end_date',
    'total_obligation',
    'type',
    'awarding_agency_name',
    'awarding_subtier_name',
    'funding_agency_name',
    'funding_subtier_name'
];

const remapData = (data, idField) => {
    // remap expected child fields to top-level fields
    const remappedData = data;
    let awardingAgencyName = '';
    let awardingSubtierName = '';
    let fundingAgencyName = '';
    let fundingSubtierName = '';
    let recipientName = '';

    if (data.awarding_agency) {
        awardingAgencyName = data.awarding_agency.toptier_agency.name;
        awardingSubtierName = data.awarding_agency.subtier_agency.name;
    }

    if (data.funding_agency) {
        fundingAgencyName = data.funding_agency.toptier_agency.name;
        fundingSubtierName = data.funding_agency.subtier_agency.name;
    }

    if (data.recipient) {
        recipientName = data.recipient.recipient_name;
    }
    remappedData.awarding_agency_name = awardingAgencyName;
    remappedData.awarding_subtier_name = awardingSubtierName;
    remappedData.funding_agency_name = fundingAgencyName;
    remappedData.funding_subtier_name = fundingSubtierName;
    remappedData.recipient_name = recipientName;

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

    const moneyCells = ['total_obligation'];
    moneyCells.forEach((cell) => {
        remappedData[cell] = MoneyFormatter.formatMoney(data[cell]);
    });

    // finally parse the moment object
    const dates = ['period_of_performance_start_date', 'period_of_performance_current_end_date'];
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
