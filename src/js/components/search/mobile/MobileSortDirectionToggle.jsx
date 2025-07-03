/**
 * MobileSortDirectionToggle.jsx
 * Created by Nick Torres 6/26/2025
 */

import React from 'react';
import PropTypes from "prop-types";
import ViewTypeButton from '../../sharedComponents/buttons/ViewTypeButton';

const propTypes = {
    sortBy: PropTypes.func,
    sort: PropTypes.object,
    setSort: PropTypes.func,
    sortDirection: PropTypes.string,
    setSortDirection: PropTypes.func,
    activeField: PropTypes.string
};

const MobileSortDirectionToggle = ({
    sortDirection,
    setSortDirection,
    activeField,
    sortBy,
    sort,
    setSort
}) => {
    const onClick = (e) => {
        if (sortBy && setSortDirection) {
            sortBy(activeField, e);
            setSortDirection(e);
        }
        else if (sort && setSort) {
            setSort(Object.assign({ field: sort?.field, direction: e }));
        }
    };
    return (
        <div className="mobile-sort-direction-toggle mobile-sort-toggle" >
            <ViewTypeButton
                value="desc"
                label="descending order"
                changeView={onClick}
                active={sortDirection === 'desc' || sort?.direction === 'desc'}
                icon="long-arrow-alt-down">
            </ViewTypeButton>
            <ViewTypeButton
                value="asc"
                label="ascending order"
                active={sortDirection === 'asc' || sort?.direction === 'asc'}
                changeView={onClick}
                icon="long-arrow-alt-up">
            </ViewTypeButton>
        </div>
    );
};

MobileSortDirectionToggle.propTypes = propTypes;
export default MobileSortDirectionToggle;
