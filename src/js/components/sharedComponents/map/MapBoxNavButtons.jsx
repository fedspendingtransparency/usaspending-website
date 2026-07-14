/**
 * MapBoxNavButtons.jsx
 * Created on 1/21/2026 by Josue Aguilar
 */

import React from 'react';
import { AngleUp, AngleLeft, AngleDown, AngleRight } from "components/sharedComponents/icons/Icons";
import PropTypes from "prop-types";

// Define map movement increment
const delta = 100;

const propTypes = {
    showNavButtons: PropTypes.bool,
    map: PropTypes.object
};

const MapBoxNavButtons = ({ showNavButtons, map }) => {
    const moveMap = (bearing) => {
        map.current.panBy(bearing);
    };

    const moveUp = () => {
        moveMap([0, -delta]);
    };

    const moveLeft = () => {
        moveMap([-delta, 0]);
    };

    const moveRight = () => {
        moveMap([delta, 0]);
    };

    const moveDown = () => {
        moveMap([0, delta]);
    };

    return (
        <div className={`map-buttons ${showNavButtons ? '' : 'hide'}`}>
            <div className="first-row">
                <button
                    onMouseDown={moveUp}
                    onTouchStart={moveUp}>
                    <AngleUp />
                </button>
            </div>
            <div className="second-row">
                <button
                    onMouseDown={moveLeft}
                    onTouchStart={moveLeft}>
                    <AngleLeft />
                </button>
                <button
                    onMouseDown={moveDown}
                    onTouchStart={moveDown}>
                    <AngleDown />
                </button>
                <button
                    onMouseDown={moveRight}
                    onTouchStart={moveRight}>
                    <AngleRight />
                </button>
            </div>
        </div>
    );
};

MapBoxNavButtons.propTypes = propTypes;
export default MapBoxNavButtons;
