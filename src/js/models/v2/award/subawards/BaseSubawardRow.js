/**
 * BaseSubawardRow.js
 * Created by Lizzie Salita 3/8/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const dayjs = require('dayjs');

export const parseDate = (string) => dayjs(string, 'YYYY-MM-DD');
export const formatDate = (date) => date.format('MM/DD/YYYY');

const BaseSubawardRow = {
    populate(data) {
        this.id = data.id || '';
        this.number = data.subaward_number || '';
        this.description = data.description || '--';
        this._actionDate = (
            (data.action_date && parseDate(data.action_date)) || null
        );
        this._amount = parseFloat(data.amount) || 0;
        this.recipient = (data.recipient_name) || '';
    },
    get actionDate() {
        if (this._actionDate) {
            return formatDate(this._actionDate);
        }
        return '';
    },
    get amount() {
        if (this._amount) {
            return MoneyFormatter.formatMoney(this._amount);
        }
        return '';
    }
};

export default BaseSubawardRow;
