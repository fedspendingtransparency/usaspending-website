/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import { formatNumber } from 'helpers/awardAmountHelper';
import EntityWarning from '../location/EntityWarning';

const propTypes = {
    searchSpecificRange: PropTypes.func
};

export default class SpecificAwardAmountItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            min: '',
            max: '',
            showWarning: false,
            warningMessage: ''
        };

        this.searchSpecificRange = this.searchSpecificRange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.minChange = this.minChange.bind(this);
        this.maxChange = this.maxChange.bind(this);
    }

    onKeyDown(e) {
        // Enter
        if (e.keyCode === 13) {
            e.preventDefault();
            this.searchSpecificRange();
        }
    }

    minChange(e) {
        const min = formatNumber(e.target.value);
        this.setState({ min }, this.verifyNumberLogic);
    }

    maxChange(e) {
        const max = formatNumber(e.target.value);
        this.setState({ max }, this.verifyNumberLogic);
    }

    searchSpecificRange() {
        const { min, max } = this.state;
        this.props.searchSpecificRange([min, max]);
    }

    verifyNumberLogic() {
        const min = Number(this.state.min);
        const max = Number(this.state.max);
        let showWarning = false;
        const warningMessage = 'Please choose a min less than the max';
        const minIsNull = (!min && min !== 0);
        const maxIsNull = (!max && max !== 0);
        if (min < max) showWarning = false;
        if (min > max) showWarning = true;
        if (minIsNull) showWarning = false;
        if (maxIsNull) showWarning = false;
        if (showWarning !== this.state.showWarning) {
            this.setState({ showWarning, warningMessage });
        }
    }

    render() {
        const {
            min,
            max,
            showWarning,
            warningMessage
        } = this.state;
        let disabled = (!min && min !== 0) &&
        (!max && max !== 0);
        if (showWarning) disabled = true;

        return (
            <div className="specific-award-amount">
                <hr className="specific-award-amount-divider" />
                {
                    showWarning &&
                    <div className="award-amount-warning">
                        <EntityWarning message={warningMessage} />
                    </div>
                }
                <div className="specific-award-amount-wrapper">
                    <span>$</span>
                    <input
                        type="number"
                        placeholder="Min"
                        step="none"
                        className="specific-award-min"
                        value={min}
                        onChange={this.minChange} />
                    <span>to</span>
                    <input
                        type="number"
                        placeholder="Max"
                        step="none"
                        className="specific-award-max"
                        value={max}
                        onChange={this.maxChange} />
                    <IndividualSubmit
                        disabled={disabled}
                        className="award-amount-submit"
                        onClick={this.searchSpecificRange}
                        label="Filter by custom award amount range"
                        onKeyDown={this.onKeyDown} />
                </div>
            </div>
        );
    }
}

SpecificAwardAmountItem.propTypes = propTypes;
