/**
 * BaseAwardLatestTransaction.js
 * Created by Lizzie Salita 3/5/18
 */

import BaseAdditionalDetails from './BaseAdditionalDetails';

const BaseAwardLatestTransaction = {
    populate(data) {
        const additionalDetails = Object.create(BaseAdditionalDetails);
        additionalDetails.populate(data.contract_data);
        this.additionalDetails = additionalDetails;

        this.actionDate = data.action_date;
    }
};

export default BaseAwardLatestTransaction;
