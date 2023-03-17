import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../_scss/elements/_accordion.scss';

const Accordion = ({
    title, children, closedIcon, openIcon, iconClassName, setOpen
}) => {
    const [closed, setClosed] = useState(true);

    const toggleOpen = (e) => {
        e.stopPropagation();
        setClosed((prevClosed) => !prevClosed);
        setOpen((prevOpen) => !prevOpen);
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
                <div className="content">{children}</div>
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
    icon: PropTypes.element || PropTypes.string,
    iconClassName: PropTypes.string,
    closedIcon: PropTypes.string,
    openIcon: PropTypes.string,
    setOpen: PropTypes.func
};
