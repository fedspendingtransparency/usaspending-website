/**
  * AwardSummary.js
  * Created by Kevin Li 11/28/16
  **/

import moment from 'moment';

import { awardTypeCodes } from 'dataMapping/search/awardType';
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
    'awarding_agency_name'
];

const remapData = (data) => {
    // remap expected child fields to top-level fields
    const remappedData = data;
    let agencyName = '';
    let recipientName = '';
    if (data.awarding_agency) {
        agencyName = data.awarding_agency.toptier_agency.name;
    }
    if (data.recipient) {
        recipientName = data.recipient.recipient_name;
    }
    remappedData.awarding_agency_name = agencyName;
    remappedData.recipient_name = recipientName;

    // set the ID to the relevant field
    let id = data.fain;
    if (!data.fain && data.piid) {
        id = data.piid;
    }
    else if (data.uri) {
        id = data.uri;
    }
    remappedData.id = id;

    // convert the award type code to a user-readable string
    remappedData.type = awardTypeCodes[data.type];

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
    constructor(data) {
        const remappedData = remapData(data);
        // create the object
        super(recordType, fields, remappedData);
    }
}

export default AwardSummary;
