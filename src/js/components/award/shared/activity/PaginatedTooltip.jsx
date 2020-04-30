/**
 * PaginatedTooltip.jsx
 * Created By Jonathan Hill 04/29/2020
 */

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.array,
    tooltipElement: PropTypes.element
};

const PaginatedTooltip = ({ data, tooltipElement }) => (
    <div className="paginated-tooltip">
        {cloneElement(tooltipElement, { data: data[0] })}
    </div>
);

PaginatedTooltip.propTypes = propTypes;
export default PaginatedTooltip;
