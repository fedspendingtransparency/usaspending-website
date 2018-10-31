/**
 * CoreAward.js
 * Created by David Trinh 10/9/18
 */


import { formatMoney } from 'helpers/moneyFormatter';

const CoreAward = {
    populateCore(data) {
        this.category = data.category;
        this.id = data.id || '';
        this.type = data.type || '';
        this.typeDescription = data.typeDescription || '--';
        this.description = data.description || '--';
        this._subawardTotal = parseFloat(data.subawardTotal) || 0;
        this.subawardCount = parseFloat(data.subawardCount) || 0;
    },
    get subawardTotal() {
        return formatMoney(this._subawardTotal);
    }
};

export default CoreAward;
