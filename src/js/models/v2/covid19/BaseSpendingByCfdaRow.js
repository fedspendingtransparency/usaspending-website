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
    this._number = (this._id && this._code) ? `${this._id}.${this._code}` : '';
    if (this._number && this._description) {
        this.name = `${this._number}: ${this._description}`;
    }
    else {
        this.name = `${this._number}${this.description}` || '--';
    }
};

export default BaseSpendingByCfdaRow;
