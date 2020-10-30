/**
 * FiscalYearFilter.jsx
 * Created by Lizzie Salita 4/24/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';
import { handlePotentialStrings } from 'containers/explorer/detail/helpers/explorerQuarters';
import QuarterPickerWithFY from 'components/sharedComponents/QuarterPickerWithFY';

const propTypes = {
    currentFy: PropTypes.string,
    latestSelectedTimePeriod: PropTypes.string,
    updateFilter: PropTypes.func,
    valid: PropTypes.string
};

export default class FiscalYearFilter extends React.Component {
    constructor(props) {
        super(props);

        this.quarterPickerSelection = this.quarterPickerSelection.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
    }

    quarterPickerSelection(selectedOption) {
        if (parseInt(this.props.currentFy, 10) >= 2020) {
            this.props.updateFilter('period', `${selectedOption}`);
            this.props.updateFilter('quarter', null);
        }
        else {
            this.props.updateFilter('quarter', `${selectedOption}`);
            this.props.updateFilter('period', null);
        }
    }

    pickedYear(year, period = null) {
        this.props.updateFilter('fy', `${year}`);

        if (handlePotentialStrings(year) >= 2020) {
            this.props.updateFilter('period', period);
            this.props.updateFilter('quarter', null);
        }
        else {
            this.props.updateFilter('quarter', `4`);
            this.props.updateFilter('period', null);
        }
    }

    render() {
        let icon = (
            <div className="icon valid">
                <CheckCircle />
            </div>
        );

        if (!this.props.valid) {
            icon = (
                <div className="icon invalid">
                    <ExclamationCircle />
                </div>
            );
        }

        return (
            <div className="download-filter">
                <h3 className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">fiscal year</span> and <span className="download-filter__title_em">quarter</span>.
                </h3>
                <div className="download-filter__content">
                    <div className="download-filter__fy">
                        <QuarterPickerWithFY
                            selectedFy={this.props.currentFy}
                            handlePickedYear={this.pickedYear}
                            handleQuarterPickerSelection={this.quarterPickerSelection}
                            latestSelectedTimeInterval={this.props.latestSelectedTimePeriod} />
                    </div>
                    <p className="download-filter__content-note"><span className="download-filter__content-note_bold">Note:</span> The data included in the Custom Account Download was first collected in the second quarter of fiscal year 2017, per the Digital Accountability and Transparency Act of 2014 (DATA Act). Financial data will not be available prior to that timeframe.</p>
                    <p className="download-filter__content-note">The Account Balances and Account Breakdown by Program Activity & Object Class files contain cumulative financial balances at the account and agency levels, as of the end of the quarter selected. The Account Breakdown by Award file contains every transaction reported at the account and agency levels, for the fiscal year through the end of the quarter selected.</p>
                </div>
            </div>
        );
    }
}

FiscalYearFilter.propTypes = propTypes;
