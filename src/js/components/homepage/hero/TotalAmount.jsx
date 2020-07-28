import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { delay } from 'lodash';

import { getTotalSpendingAbbreviated } from 'helpers/covid19Helper';

let amountUpdate = null;

const updateSpeedByIndexRange = (index) => {
    const indexAsInt = index + 1;
    if (indexAsInt <= 100) return 1;
    if (indexAsInt <= 200) return 2;
    if (indexAsInt <= 300) return 4;
    if (indexAsInt <= 400) return 8;
    if (indexAsInt <= 425) return 16;
    if (indexAsInt <= 490) return 32;
    return 64;
};

const TotalAmount = ({
    total,
    isLoading,
    className,
    completeIncrement
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const now = moment();
        const updateAmount = (amount, speedOfUpdate) => new Promise((resolve) => {
            amountUpdate = delay(() => {
                ref.current.innerHTML = getTotalSpendingAbbreviated(amount);
                if (amount === total) {
                    console.log('Time to Increment Total COVID Spending: ', moment.duration(moment().diff(now)).as('seconds'));
                }
                resolve();
            }, speedOfUpdate);
        });
        if (!isLoading) {
            new Array(500)
                .fill(0)
                .reduce((prevPromise, currentValue, currentIndex) => prevPromise
                    .then(() => {
                        const divisor = (currentIndex + 1) * 0.002;
                        return updateAmount(divisor * total, updateSpeedByIndexRange(currentIndex));
                    }), Promise.resolve())
                .then(() => {
                    completeIncrement();
                });
        }
    }, [isLoading, total, completeIncrement]);

    return (
        <strong className={className} ref={ref}>$0.00</strong>
    );
};

TotalAmount.propTypes = {
    isLoading: PropTypes.bool,
    total: PropTypes.number,
    className: PropTypes.string,
    completeIncrement: PropTypes.func
};

export default TotalAmount;
