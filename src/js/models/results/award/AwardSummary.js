/**
  * AwardSummary.js
  * Created by Kevin Li 11/28/16
  **/

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

class AwardSummary extends GenericRecord {
    constructor(data) {
        // remap expected child fields to top-level fields
        const remappedData = data;
        let agencyName = '';
        let recipientName = '';
        if (data.awarding_agency) {
            agencyName = data.awarding_agency.name;
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

        // create the object
        super(recordType, fields, data);
    }
}

export default AwardSummary;
