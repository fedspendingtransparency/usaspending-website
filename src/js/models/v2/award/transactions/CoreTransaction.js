/**
 * CoreTransaction.js
 * Created by Lizzie Salita 3/8/18
 */

const dayjs = require('dayjs');

export const parseDate = (string) => dayjs(string, 'YYYY-MM-DD');
export const formatDate = (date) => date.format('MM/DD/YYYY');

const CoreTransaction = {
    populateCore(data) {
        this.id = data.id || '';
        this.type = data.type || '';
        this._actionDate = (
            (data.actionDate && parseDate(data.actionDate)) || null
        );
        this.actionType = data.actionType || '';
        this._actionTypeDescription = data.actionTypeDescription || '';
        this.modificationNumber = data.modificationNumber || '';
        this.description = data.description || '';
        this.cfdaNumber = data.cfda_number || '';
    },
    get actionDate() {
        if (this._actionDate) {
            return formatDate(this._actionDate);
        }
        return '';
    },
    get actionTypeDescription() {
        if (this.actionType && this._actionTypeDescription) {
            return `${this.actionType.toUpperCase()}: ${this._actionTypeDescription}`;
        }
        return '--';
    }
};

export default CoreTransaction;
