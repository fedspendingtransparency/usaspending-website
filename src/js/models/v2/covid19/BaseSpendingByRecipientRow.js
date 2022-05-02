/**
 * BaseSpendingByRecipientRow.js
 * Created by Lizzie Salita 7/9/20
 */

import CoreSpendingTableRow from './CoreSpendingTableRow';

const BaseSpendingByRecipientRow = Object.create(CoreSpendingTableRow);

BaseSpendingByRecipientRow.populate = function populate(data) {
    // Generate generic object properties using the core model
    this.populateCore(data);
    // Add properties specific to Recipient rows
    if (Array.isArray(this._id) && this._id.length > 0) {
        this._id.forEach((id) => {
            const type = id.substring(id.length - 1, id.length);
            if (type === 'C') {
                // child recipient
                this._childId = id;
            }
            else if (type === 'R') {
                this._recipientId = id;
            }
        });
    }
};

export default BaseSpendingByRecipientRow;
