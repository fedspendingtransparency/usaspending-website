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
        internal: PropTypes.string
    })),
    activeFilter: PropTypes.string,
    tabCounts: PropTypes.object
};

const AwardFilterButtons = ({
    onClick,
    filters,
    activeFilter,
    tabCounts
}) => (
    <div className="award-filter__buttons">
        {
            filters.map((button) => (
                <AwardFilterButton
                    key={button.internal}
                    onClick={onClick}
                    label={button.label}
                    value={button.internal}
                    active={activeFilter === button.internal}
                    showCount={!!tabCounts}
                    count={tabCounts && tabCounts[button.internal]}
                    disabled={button.isDisabled} />
            ))
        }
    </div>
);

AwardFilterButtons.propTypes = propTypes;
export default AwardFilterButtons;
