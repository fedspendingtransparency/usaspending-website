import React from 'react';
import PropTypes from "prop-types";
import ViewTypeButton from '../../sharedComponents/buttons/ViewTypeButton';

const propTypes = {
    onToggle: PropTypes.func
};

const MobileSortDirectionToggle = ({
    sortDirection,
    setSortDirection
}) => {
    console.debug("sort direction: ", sortDirection);
    return (
        <div className="mobile-sort-direction-toggle mobile-sort-toggle" >
            <ViewTypeButton
                value="desc"
                label="descending order"
                changeView={setSortDirection}
                active={sortDirection === 'desc'}
                icon="long-arrow-alt-down">
            </ViewTypeButton>
            <ViewTypeButton
                value="asc"
                label="ascending order"
                active={sortDirection === 'asc'}
                changeView={setSortDirection}
                icon="long-arrow-alt-up">
            </ViewTypeButton>
        </div>
    );
};

MobileSortDirectionToggle.propTypes = propTypes;
export default MobileSortDirectionToggle;
