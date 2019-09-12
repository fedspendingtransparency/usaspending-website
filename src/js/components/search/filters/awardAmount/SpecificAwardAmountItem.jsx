/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';

import { ensureInputIsNumeric, formatAwardAmountRange } from 'helpers/awardAmountHelper';
import AwardAmountItem from './AwardAmountItem';
import EntityWarning from '../location/EntityWarning';

const propTypes = {
    searchSpecificRange: PropTypes.func
};

export default class SpecificAwardAmountItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            min: null,
            max: null,
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
        const min = ensureInputIsNumeric(e.target.value);
        this.setState({ min }, this.verifyNumberLogic);
        // this.verifyNumberLogic();
    }

    maxChange(e) {
        const max = ensureInputIsNumeric(e.target.value);
        this.setState({ max }, this.verifyNumberLogic);
        // this.verifyNumberLogic();
    }

    searchSpecificRange() {
        const { min, max } = this.state;
        this.props.searchSpecificRange([min, max]);
    }

    verifyNumberLogic() {
        const { min, max } = this.state;
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
        const hide = (
            (!min && min !== 0) &&
            (!max && max !== 0)) ? ' hide' : '';
        let disabled = !!hide;
        if (showWarning) disabled = true;

        const label = formatAwardAmountRange([min, max], { precision: 2 });
        return (
            <div className="specific-award-amount">
                <hr className="specific-award-amount-divider" />
                <div
                    className={`award-amount-item-wrapper${hide}`}
                    role="status">
                    <AwardAmountItem
                        {...this.props}
                        label={label}
                        key="award-range-specific"
                        rangeID="specific"
                        toggleSelection={this.searchSpecificRange} />
                </div>
                {
                    showWarning &&
                    <div className="award-amount-warning">
                        <EntityWarning message={warningMessage} />
                    </div>
                }
                <div className="specific-award-amount-wrapper">
                    <span>$</span>
                    <input
                        type="text"
                        placeholder="Min"
                        className="specific-award-min"
                        onChange={this.minChange} />
                    <span>to</span>
                    <input
                        type="text"
                        placeholder="Max"
                        className="specific-award-max"
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
