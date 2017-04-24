/**
 * SubawardItem.js
 * Created by Kevin Li 4/17/17
 */

import moment from 'moment';

import * as MoneyFormatter from 'helpers/moneyFormatter';

import GenericRecord from '../GenericRecord';

const recordType = 'subaward';
const fields = [
    'id',
    'subaward_number',
    'description',
    'action_date',
    'amount',
    'recipient'
];

const remapData = (data) => {
    // remap expected child fields to top-level fields
    const remappedData = Object.assign({}, data);

    remappedData.recipient = '';

    if (data.action_date) {
        remappedData.action_date = moment(data.action_date, 'YYYY-MM-DD').format('M/D/YYYY');
    }

    if (data.amount) {
        remappedData.amount = MoneyFormatter.formatMoney(data.amount);
    }

    if (data.recipient) {
        remappedData.recipient = data.recipient.recipient_name;
    }

    return remappedData;
};

class SubawardItem extends GenericRecord {
    constructor(data) {
        const remappedData = remapData(data);
        // create the object
        super(recordType, fields, remappedData);
    }
}

export default SubawardItem;
