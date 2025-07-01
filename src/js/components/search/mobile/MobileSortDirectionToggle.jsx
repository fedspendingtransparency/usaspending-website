import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import ViewTypeButton from '../../sharedComponents/buttons/ViewTypeButton';

const propTypes = {
    onToggle: PropTypes.func
};

const MobileSortDirectionToggle = ({
    sortDirection,
    setSortDirection,
    activeField,
    sortBy,
    sort,
    setSort
}) => {
    console.debug("props: ", sortDirection, setSortDirection, activeField, sortBy, sort, setSort);
    // const [sortedBy, setSortedBy] = useState('desc');

    // useEffect(() => {

    // }, sort, sortDirection);
    const onClick = (e) => {
        if (sortBy && setSortDirection) {
            console.debug("E1a: ", e);
            sortBy(activeField, e);
            setSortDirection(e);
        }
        else if (sort && setSort) {
            console.debug("E1b: ", e);
            setSort(Object.assign({ field: sort?.field, direction: e }));
        }
    };
    return (
        <div className="mobile-sort-direction-toggle mobile-sort-toggle" >
            <ViewTypeButton
                value="asc"
                label="ascending order"
                changeView={onClick}
                active={sortDirection === 'asc' || sort?.direction === 'asc'}
                icon="long-arrow-alt-down">
            </ViewTypeButton>
            <ViewTypeButton
                value="desc"
                label="descending order"
                active={sortDirection === 'desc' || sort?.direction === 'desc'}
                changeView={onClick}
                icon="long-arrow-alt-up">
            </ViewTypeButton>
        </div>
    );
};

MobileSortDirectionToggle.propTypes = propTypes;
export default MobileSortDirectionToggle;
