import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../_scss/elements/_accordion.scss';

const Accordion = ({
    title,
    children,
    closedIcon,
    openIcon,
    iconClassName,
    setOpen,
    contentClassName = '',
    openObject = false,
    selectedChipCount = 0
}) => {
    const [closed, setClosed] = useState(!openObject);

    const toggleOpen = (e) => {
        e.stopPropagation();
        setClosed((prevClosed) => !prevClosed);
        if (openObject) {
            setOpen();
        }
        else {
            setOpen((prevOpen) => !prevOpen);
        }
    };

    const keyClickToggle = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            setClosed((prevClosed) => !prevClosed);
        }
    };

    return (
        <div className="accordion-container">
            <section data-testid="accordion" className={!closed ? `open accordion--open accordion` : `accordion`}>
                {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/no-static-element-interactions */}
                <div onClick={toggleOpen} onKeyDown={keyClickToggle} className="heading">
                    {title}
                    <div className="heading--chip-container">
                        {(selectedChipCount > 0) && (
                            <div className="selected-chip-count">
                                {` ${selectedChipCount} selected`}
                            </div>
                        )}
                        <button
                            onClick={toggleOpen}
                            onKeyDown={keyClickToggle}
                            className="toggle"
                            aria-label={closed ? 'Open toggle' : 'Close toggle'}>
                            <FontAwesomeIcon
                                icon={closedIcon || "plus"}
                                className={iconClassName || "plus"} />
                            <FontAwesomeIcon
                                icon={openIcon || "minus"}
                                className={iconClassName || "minus"} />
                        </button>
                    </div>
                </div>
                <div className={`content ${contentClassName}`}>{children}</div>
            </section>
        </div>
    );
};

export default Accordion;

/* props notes
title: shows in the top box, collapsed or open
color: theme color for border, collapsed background, and highlighted text within
backgroundColor: background of collapsed box
*/
Accordion.propTypes = {
    title: PropTypes.any.isRequired,
    children: PropTypes.element || PropTypes.string,
    iconClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    closedIcon: PropTypes.string,
    openIcon: PropTypes.string,
    setOpen: PropTypes.func,
    openObject: PropTypes.bool,
    selectedChipCount: PropTypes.number
};
