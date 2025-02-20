/**
 * SelectedItemsChips.jsx
 * Created by Josue Aguilar 2/20/2025
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from "prop-types";

const propTypes = {
    selectedItems: PropTypes.array,
    isClickable: PropTypes.bool,
    itemCount: PropTypes.number,
    title: PropTypes.string
};

const SelectedItemsChips = ({
    selectedItems, isClickable, itemCount, title
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
            `div.selected-filters.${title}`
        )?.getBoundingClientRect();
        const firstChip = document.querySelector(
            `div.selected-filters.${title}`
        )?.firstChild?.getBoundingClientRect();
        const lastChip = document.querySelector(
            `div.selected-filters.${title}`
        )?.lastChild?.getBoundingClientRect();

        setFirstChipLeft(firstChip?.left);
        setChipContainerLeft(chipsContainer?.left);
        setLastChipRight(lastChip?.right);
        setChipContainerRight(chipsContainer?.right);
    };

    useEffect(() => {
        // if (!selectedItems) {
        //     setRightFade(true);
        // }
        getLastElement();
        selectedChips.current?.addEventListener('scroll', getLastElement);
        return () => selectedChips.current?.removeEventListener('scroll', getLastElement);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems]);

    useEffect(() => {
        if ((lastChipRight + 7) < chipContainerRight) {
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
    return (
        <div
            className={`selected-filters ${title} ${rightFade && 'right-fade'} ${leftFade && 'left-fade'}`}
            ref={selectedChips}>
            { isClickable && itemCount > 0 && selectedItems }
        </div>
    );
};

SelectedItemsChips.propTypes = propTypes;
export default SelectedItemsChips;
