/**
 * BaseSubawardRow.js
 * Created by Lizzie Salita 3/8/18
 */

import CoreSubaward from './CoreSubaward';

const BaseSubawardRow = Object.create(CoreSubaward);

BaseSubawardRow.populate = function populate(data) {
    const coreData = {
        id: data.id,
        number: data.subaward_number,
        description: data.description,
        actionDate: data.action_date,
        amount: data.amount,
        recipient: data.recipient && data.recipient.recipient_name
    };
    this.populateCore(coreData);
};

export default BaseSubawardRow;
