/**
 * FiscalYearFilter.jsx
 * Created by Lizzie Salita 4/24/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, ExclamationCircle } from 'components/sharedComponents/icons/Icons';

import { lastCompletedQuarterInFY } from 'containers/explorer/detail/helpers/explorerQuarters';
import QuarterPicker from 'components/explorer/detail/sidebar/QuarterPicker';

const propTypes = {
    currentFy: PropTypes.string,
    currentQuarter: PropTypes.string,
    updateFilter: PropTypes.func,
    valid: PropTypes.string
};

export default class FiscalYearFilter extends React.Component {
    constructor(props) {
        super(props);

        this.pickedQuarter = this.pickedQuarter.bind(this);
        this.pickedYear = this.pickedYear.bind(this);
    }

    pickedQuarter(quarter) {
        this.props.updateFilter('quarter', `${quarter}`);
    }

    pickedYear(year) {
        const lastQuarter = lastCompletedQuarterInFY(year);

        this.props.updateFilter('fy', `${lastQuarter.year}`);
        this.props.updateFilter('quarter', `${lastQuarter.quarter}`);
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
                <div className="download-filter__title">
                    {icon} Select a <span className="download-filter__title_em">fiscal year</span> and <span className="download-filter__title_em">quarter</span>.
                </div>
                <div className="download-filter__content">
                    <div className="download-filter__fy">
                        <QuarterPicker
                            fy={this.props.currentFy}
                            quarter={this.props.currentQuarter}
                            pickedQuarter={this.pickedQuarter}
                            pickedYear={this.pickedYear} />
                    </div>
                </div>
            </div>
        );
    }
}

FiscalYearFilter.propTypes = propTypes;
