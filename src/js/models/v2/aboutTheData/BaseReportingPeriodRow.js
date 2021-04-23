/**
 * BaseReportingPeriodRow.js
 * Created by Lizzie Salita 12/8/20
 */

import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { getPeriodWithTitleById } from 'helpers/aboutTheDataHelper';
import CoreReportingRow from './CoreReportingRow';

const BaseReportingPeriodRow = Object.create(CoreReportingRow);

BaseReportingPeriodRow.populate = function populate(data) {
    this.populateCore(data);
    this.fiscalYear = parseInt(data.fiscal_year, 10) || 0;
    this.fiscalPeriod = parseInt(data.fiscal_period, 10) || 0;
    this.reportingPeriod = `FY ${this.fiscalYear}: ${getPeriodWithTitleById(`${this.fiscalPeriod}`).title}`;
    this._percentOfBudget = data.percent_of_total_budgetary_resources;
    if (!this._percentOfBudget && typeof this._percentOfBudget !== 'number') {
        this.percentOfBudget = '--';
    }
    else {
        this.percentOfBudget = `${formatNumberWithPrecision(this._percentOfBudget, 2)}%`;
    }
};

export default BaseReportingPeriodRow;
