import React, { useState } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewTypeButton from '../../sharedComponents/buttons/ViewTypeButton';

const propTypes = {
    onToggle: PropTypes.func
};

const MobileSortDirectionToggle = ({
    onToggle,
    sortDirection
}) => {
    const onToggleClick = () => {
        if (onToggle) {
            onToggle();
        }
    };
    console.debug("sort direction: ", sortDirection);
    return (
        <div className="mobile-sort-direction-toggle mobile-sort-toggle" >
            <ViewTypeButton
                value="desc"
                label="descending order"
                changeView={onToggleClick}
                active={sortDirection === 'desc'}
                icon="long-arrow-alt-down">
            </ViewTypeButton>
            <ViewTypeButton
                value="asc"
                label="ascending order"
                active={sortDirection === 'asc'}
                changeView={onToggleClick}
                icon="long-arrow-alt-up">
            </ViewTypeButton>
        </div>
    );
};

MobileSortDirectionToggle.propTypes = propTypes;
export default MobileSortDirectionToggle;
