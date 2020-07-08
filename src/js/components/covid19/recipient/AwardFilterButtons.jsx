/**
 * AwardFilterButtons.jsx
 * Created by Jonathan Hill 07/06/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import AwardFilterButton from './AwardFilterButton';

const propTypes = {
    onClick: PropTypes.func,
    filters: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })),
    activeFilter: PropTypes.string
};

const AwardFilterButtons = ({ onClick, filters, activeFilter }) => (
    <div className="award-filter__buttons">
        {
            filters.map((button) => (
                <AwardFilterButton
                    onClick={onClick}
                    label={button.label}
                    value={button.value}
                    activeFilter={activeFilter} />
            ))
        }
    </div>
);

AwardFilterButtons.propTypes = propTypes;
export default AwardFilterButtons;
