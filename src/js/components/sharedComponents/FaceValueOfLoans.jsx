/**
 * FaceValueOfLoans.jsx
 * Created by James Lee 06/04/20
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';

const propTypes = {
    amount: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    headingClass: PropTypes.string.isRequired,
    transactions: PropTypes.string.isRequired,
    tooltipComponent: PropTypes.element,
    tooltipClasses: PropTypes.string,
    tooltipPosition: PropTypes.string,
    tooltipIcon: PropTypes.string,
    primeAwards: PropTypes.bool
};

const FaceValueOfLoans = (props) => (
    <div className="totals">
        <div className="totals__header">
            <h3 className={props.headingClass}>
                {props.heading}
            </h3>

            <TooltipWrapper
                className={props.tooltipClasses}
                tooltipPosition={props.tooltipPosition}
                icon={props.tooltipIcon}
                wide
                tooltipComponent={props.tooltipComponent} />
        </div>

        <div className="totals__amount">
            {props.amount}
        </div>

        <div className="totals__awards">
            from {props.primeAwards ?
                <><span className="state-overview__total">{props.transactions}</span> {props.transactions === "1" ? "prime award" : "prime awards"}</>
                :
                <><span className="state-overview__total">{props.transactions}</span> {props.transactions === "1" ? "transaction" : "transactions"}</>
            }
        </div>
    </div>
);

FaceValueOfLoans.propTypes = propTypes;
export default FaceValueOfLoans;
