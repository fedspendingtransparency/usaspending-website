/**
 * BaseAgencyRow.js
 * Created by Lizzie Salita 11/20/20
 */

import { calculatePercentage } from 'helpers/moneyFormatter';
import CoreReportingRow from './CoreReportingRow';

const BaseAgencyRow = Object.create(CoreReportingRow);

BaseAgencyRow.populate = function populate(data) {
    this.populateCore(data);
    this.code = data.toptier_code || '';
    this._name = data.agency_name || '';
    this._abbreviation = data.abbreviation || '';
    this.name = (this._name && this._abbreviation)
        ? `${this._name} (${this._abbreviation})`
        : this._name;
    this.certified = data.recent_publication_date_certified || false;
    // eslint-disable-next-line camelcase
    this._federalTotal = data?.federalTotal?.total_budgetary_resources;
    this.percentageOfTotalFederalBudget = calculatePercentage(this._budgetAuthority, this._federalTotal, '--', 2, { absoluteMin: '< 0.01%' });
};

export default BaseAgencyRow;
