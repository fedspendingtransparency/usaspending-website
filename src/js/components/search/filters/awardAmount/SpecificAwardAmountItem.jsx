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
        this.verifyNumberLogic = this.verifyNumberLogic.bind(this);
    }

    componentDidMount() {
        document.getElementById("award-amount_min").addEventListener("click", this.verifyNumberLogic);
        document.getElementById("award-amount_max").addEventListener("click", this.verifyNumberLogic);
    }

    componentWillUnmount() {
        document.getElementById("award-amount_min").removeEventListener("click", this.verifyNumberLogic);
        document.getElementById("award-amount_max").removeEventListener("click", this.verifyNumberLogic);
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
        if (this.state && this.state.max === '' && this.state.min === '') {
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
        const numberMin = Number(min);
        const numberMax = Number(max);

        if (minIsNull || maxIsNull) {
            showWarning = false;
        }
        else {
            if (numberMin < numberMax) showWarning = false;
            if (numberMin > numberMax) showWarning = true;
        }

        if (showWarning !== this.state.showWarning) {
            this.setState({ showWarning });
        }

        // figure out how to change the error message when focus changes
        if ((numberMin > numberMax) && document.activeElement.id === 'award-amount_max') {
            this.setState({ showWarning, warningMessage: maxWarningMessage });
        } else if ((numberMin > numberMax) && document.activeElement.id === 'award-amount_min') {
            this.setState({ showWarning, warningMessage: minWarningMessage });
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
                            onChange={this.minChange}
                            id="award-amount_min" />
                    </div>
                    <div className="specific-award-amount-column">
                        <span className="award-amount-label">MAXIMUM AMOUNT</span>
                        <input
                            type="number"
                            placeholder="No maximum"
                            step="none"
                            className="specific-award-max"
                            value={max}
                            onChange={this.maxChange}
                            id="award-amount_max" />
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
