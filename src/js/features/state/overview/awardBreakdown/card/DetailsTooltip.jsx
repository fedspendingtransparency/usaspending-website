/**
 * DetailsTooltip.jsx
 * Created by Lizzie Salita 5/8/18
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    closeTooltip: PropTypes.func
};

const DetailsTooltip = ({ closeTooltip }) => {
    const wrapperRef = useRef(null);

    return (
        <div
            ref={wrapperRef}
            onBlur={closeTooltip}
            onMouseLeave={closeTooltip}
            className="state-overview-tooltip"
            style={{
                top: 44,
                left: 100
            }}>
            <div className="state-overview-tooltip__info_icon">
                <InfoCircle />
            </div>
            <div className="state-overview-tooltip__text_holder">
                <div className="state-overview-tooltip__tooltip_title">
                    Data Sources
                </div>
                <div className="state-overview-tooltip__tooltip_text">
                    <p>
                        The amounts used are based on U.S. Census data of specific years noted in parentheses.
                    </p>
                    <p>
                        <strong>Awarded Amount Per Capita</strong> is calculated using the Total Award Amount of the
                        selected time period, divided by the population amount shown in the table.
                    </p>
                </div>
            </div>
        </div>
    );
};

DetailsTooltip.propTypes = propTypes;
export default DetailsTooltip;
