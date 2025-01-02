/**
 * SpecificAwardAmountItem
 * Created by michaelbray on 3/7/17.
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'data-transparency-ui';

const propTypes = {
    searchSpecificRange: PropTypes.func
};

const SpecificAwardAmountItem = ({ searchSpecificRange }) => {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const maxInput = useRef(null);
    const minInput = useRef(null);

    const minChange = (e) => {
        setMin(e.target.value);
    };

    const maxChange = (e) => {
        setMax(e.target.value);
    };

    const searchRange = () => {
        searchSpecificRange([min, max]);
    };

    const verifyNumberLogic = () => {
        if (max === '' && min === '') {
            if (showWarning) {
                setShowWarning(false);
                setWarningMessage('');
            }
            return;
        }
        let tempShowWarning = false;
        const maxWarningMessage = 'Maximum amount should be larger than or equal to the minimum amount';
        const minWarningMessage = 'Minimum amount should be smaller than or equal to the maximum amount';
        const minIsNull = (!min && min !== '0');
        const maxIsNull = (!max && max !== '0');
        const numberMin = Number(min);
        const numberMax = Number(max);

        if (minIsNull || maxIsNull) {
            tempShowWarning = false;
        }
        else {
            if (numberMin < numberMax) tempShowWarning = false;
            if (numberMin > numberMax) tempShowWarning = true;
        }

        if (showWarning !== tempShowWarning) {
            setShowWarning(tempShowWarning);
        }

        // figure out how to change the error message when focus changes
        if ((numberMin > numberMax) && document.activeElement.id === 'award-amount_max') {
            setShowWarning(tempShowWarning);
            setWarningMessage(maxWarningMessage);
        }
        else if ((numberMin > numberMax) && document.activeElement.id === 'award-amount_min') {
            setShowWarning(showWarning);
            setWarningMessage(minWarningMessage);
        }
    };

    useEffect(() => {
        verifyNumberLogic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max]);

    let disabled = (!min && min !== 0) && (!max && max !== 0);
    if (showWarning) {
        disabled = true;
    }

    return (
        <div className="specific-award-amount">
            <div className="specific-award-amount-wrapper">
                <div className="specific-award-amount-column">
                    <span className="award-amount-label">MINIMUM AMOUNT</span>
                    <input
                        type="number"
                        placeholder="No minimum"
                        step="none"
                        className={showWarning ? 'specific-amount-warning specific-award-min' : 'specific-award-min'}
                        value={min}
                        onChange={minChange}
                        ref={minInput}
                        onFocus={verifyNumberLogic}
                        id="award-amount_min" />
                </div>
                <div className="specific-award-amount-column">
                    <span className="award-amount-label">MAXIMUM AMOUNT</span>
                    <input
                        type="number"
                        placeholder="No maximum"
                        step="none"
                        className={showWarning ? 'specific-amount-warning specific-award-max' : 'specific-award-max'}
                        value={max}
                        onChange={maxChange}
                        ref={maxInput}
                        onFocus={verifyNumberLogic}
                        id="award-amount_max" />
                </div>
                <Button
                    additionalClassnames="award-amount-submit"
                    copy="Add"
                    buttonTitle="Filter by custom award amount range"
                    buttonSize="sm"
                    buttonType="primary"
                    backgroundColor="light"
                    disabled={disabled}
                    onClick={searchRange} />
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
};

SpecificAwardAmountItem.propTypes = propTypes;
export default SpecificAwardAmountItem;
