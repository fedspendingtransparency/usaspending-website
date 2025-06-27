import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { Button } from 'data-transparency-ui';
import { ArrowDown, ArrowUp } from 'components/sharedComponents/icons/Icons';


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

    return (
        <div className="mobile-sort-direction-toggle" >
            <Button
                onClick={() => onToggleClick()}
                buttonSize="sm"
                buttonType={sortDirection === 'asc' ? "primaryIcon" : "secondary"}
                backgroundColor="light"
                imageAlignment="left"
                buttonTitle="Ascending"
                additionalClassnames={sortDirection === 'asc' ? "borderless" : ""}
                image={<ArrowDown alt="arrow down" />} />
            <Button
                onClick={() => onToggleClick()}
                buttonSize="sm"
                buttonType={sortDirection === 'desc' ? "primaryIcon" : 'secondary'}
                backgroundColor="light"
                imageAlignment="left"
                buttonTitle="Descending"
                additionalClassnames={sortDirection === 'desc' ? "" : "borderless"}
                image={<ArrowUp alt="arrow up" />} />
        </div>
    );
};

MobileSortDirectionToggle.propTypes = propTypes;
export default MobileSortDirectionToggle;
