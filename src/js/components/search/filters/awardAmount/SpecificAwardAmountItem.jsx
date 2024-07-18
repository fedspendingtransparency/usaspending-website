/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';

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
        this.minChange = this.minChange.bind(this);
        this.maxChange = this.maxChange.bind(this);
    }

    minChange(e) {
        const min = e.target.value;
        this.setState({ min }, this.verifyNumberLogic);
    }

    maxChange(e) {
        const max = e.target.value;
        this.setState({ max }, this.verifyNumberLogic);
    }

    searchSpecificRange() {
        const { min, max } = this.state;
        this.props.searchSpecificRange([min, max]);
    }

    verifyNumberLogic() {
        if (this.state.max === '') {
            if (this.state.showWarning) {
                this.setState({ showWarning: false, warningMessage: '' });
            }
            return;
        }
        const min = this.state.min;
        const max = this.state.max;
        let showWarning = false;
        const maxWarningMessage = 'Maximum amount should be larger than or equal to the minimum amount';
        const minWarningMessage = 'Minimum amount should be smaller than or equal to the maximum amount';
        const minIsNull = (!min && min !== '0');
        const maxIsNull = (!max && max !== '0');
        if (minIsNull || maxIsNull) {
            showWarning = false;
        }
        else {
            const numberMin = Number(min);
            const numberMax = Number(max);
            if (numberMin < numberMax) showWarning = false;
            if (numberMin > numberMax) showWarning = true;
        }
        if (showWarning !== this.state.showWarning) {
            const numberMin = Number(min);
            const numberMax = Number(max);
            if (numberMin > numberMax) {
                this.setState({ showWarning, warningMessage: minWarningMessage });
            }
            this.setState({ showWarning, warningMessage: maxWarningMessage });
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
                <div className="specific-award-amount-wrapper">
                    <div className="specific-award-amount-column">
                        <span className="award-amount-label">MINIMUM AMOUNT</span>
                        <input
                            type="number"
                            placeholder="No minimum"
                            step="none"
                            className="specific-award-min"
                            value={min}
                            onChange={this.minChange} />
                    </div>
                    <div className="specific-award-amount-column">
                        <span className="award-amount-label">MAXIMUM AMOUNT</span>
                        <input
                            type="number"
                            placeholder="No maximum"
                            step="none"
                            className="specific-award-max"
                            value={max}
                            onChange={this.maxChange} />
                    </div>
                    <Button additionalClassnames="award-amount-submit" copy="Add" buttonTitle="Filter by custom award amount range" buttonSize="sm" buttonType="primary" backgroundColor="light" disabled={disabled} onClick={this.searchSpecificRange} />
                </div>
                {
                    showWarning &&
                    <div className="award-amount-warning">
                        <span className="award-amount__invalid">Invalid search</span>
                        <ul>
                            <li>{warningMessage}</li>
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

SpecificAwardAmountItem.propTypes = propTypes;
