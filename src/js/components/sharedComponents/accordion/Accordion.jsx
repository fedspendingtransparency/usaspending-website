import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../_scss/elements/_accordion.scss';

/* props notes
title: shows in the top box, collapsed or open
color: theme color for border, collapsed background, and highlighted text within
backgroundColor: background of collapsed box
*/
const propTypes = {
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

const Accordion = ({
    title,
    children,
    closedIcon = "plus",
    openIcon = "minus",
    iconClassName,
    setOpen = () => {},
    contentClassName = '',
    openObject = false,
    selectedChipCount = 0
}) => {
    const [closed, setClosed] = useState(!openObject);

    const sectionClassName = !closed ? `open accordion--open accordion` : `accordion`;
    const buttonAriaLabel = closed ? 'Open toggle' : 'Close toggle';

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
        }
    };

    const selectedChip = (count) => ((count > 0) ?
        (
            <div className="selected-chip-count">
                {` ${count} selected`}
            </div>
        ) :
        (<></>));

    return (
        <div className="accordion-container">
            <section
                data-testid="accordion"
                className={sectionClassName}>
                {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/no-static-element-interactions */}
                <div onClick={toggleOpen} onKeyDown={keyClickToggle} className="heading">
                    {title}
                    <div className="heading--chip-container">
                        {selectedChip(selectedChipCount)}
                        <button
                            onClick={toggleOpen}
                            onKeyDown={keyClickToggle}
                            className="toggle"
                            aria-label={buttonAriaLabel}>
                            <FontAwesomeIcon
                                icon={closedIcon}
                                className={iconClassName || "plus"}
                                key="open" />
                            <FontAwesomeIcon
                                icon={openIcon}
                                className={iconClassName || "minus"}
                                key="close" />
                        </button>
                    </div>
                </div>
                <div className={`content ${contentClassName}`}>{children}</div>
            </section>
        </div>
    );
};

Accordion.propTypes = propTypes;
export default Accordion;
