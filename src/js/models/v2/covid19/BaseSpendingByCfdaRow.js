/**
 * BaseSpendingByCfdaRow.js
 * Created by Lizzie Salita 6/24/20
 */

import CoreSpendingTableRow from './CoreSpendingTableRow';

const BaseSpendingByCfdaRow = Object.create(CoreSpendingTableRow);

BaseSpendingByCfdaRow.populate = function populate(data) {
    // Generate generic object properties using the core model
    this.populateCore(data);
    // Add properties specific to CFDA
    this._link = data.resource_link || '';
    if (this.code && this.description) {
        this.name = `${this.code}: ${this.description}`;
    }
    else if (this.description && !this._code) {
        this.name = this.description || '--';
    }
    else {
        this.name = `${this._code}${this.description}` || '--';
    }
};

export default BaseSpendingByCfdaRow;
