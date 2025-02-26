/**
 * SelectedItemsChips.jsx
 * Created by Josue Aguilar 2/20/2025
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from "prop-types";

const propTypes = {
    selectedItems: PropTypes.object,
    isClickable: PropTypes.bool,
    itemCount: PropTypes.number,
    categoryKey: PropTypes.string
};

const SelectedItemsChips = ({
    selectedItems, isClickable, itemCount, categoryKey
}) => {
    const [firstChipLeft, setFirstChipLeft] = useState(0);
    const [chipContainerLeft, setChipContainerLeft] = useState(0);
    const [lastChipRight, setLastChipRight] = useState(0);
    const [chipContainerRight, setChipContainerRight] = useState(0);
    const [rightFade, setRightFade] = useState(true);
    const [leftFade, setLeftFade] = useState(false);
    const selectedChips = useRef(null);

    const getLastElement = () => {
        const chipsContainer = document.querySelector(
            `.selected-filters.${categoryKey}`
        )?.getBoundingClientRect();
        const firstChip = document.querySelector(
            `.selected-filters.${categoryKey}`
        )?.firstChild?.getBoundingClientRect();
        const lastChip = document.querySelector(
            `.selected-filters.${categoryKey}`
        )?.lastChild?.getBoundingClientRect();

        setFirstChipLeft(firstChip?.left);
        setChipContainerLeft(chipsContainer?.left);
        setLastChipRight(lastChip?.right);
        setChipContainerRight(chipsContainer?.right);
    };

    useEffect(() => {
        selectedChips.current?.addEventListener('scroll', getLastElement);
        return () => selectedChips.current?.removeEventListener('scroll', getLastElement);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (lastChipRight < chipContainerRight) {
            setRightFade(false);
        }
        else {
            setRightFade(true);
        }

        if (firstChipLeft < chipContainerLeft) {
            setLeftFade(true);
        }
        else {
            setLeftFade(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastChipRight, chipContainerRight, firstChipLeft, chipContainerLeft]);

    useEffect(() => {
        getLastElement();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemCount]);

    return (
        <div
            className={
                `selected-filters ${categoryKey} ${rightFade ? 'right-fade' : ''} ${leftFade ? 'left-fade' : ''}`
            }
            ref={selectedChips}>
            { isClickable && itemCount > 0 && selectedItems }
        </div>
    );
};

SelectedItemsChips.propTypes = propTypes;
export default SelectedItemsChips;
