import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../../_scss/elements/_accordion.scss';

const Accordion = ({ title, children }) => {
    const [closed, setClosed] = useState(true);

    const toggleOpen = (e) => {
        e.stopPropagation();
        setClosed((prevClosed) => !prevClosed);
    };

    const keyClickToggle = (e) => {
        if (e.keyCode === '13') {
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
                                        icon="plus"
                                        className="plus" />
                                            <FontAwesomeIcon
                                                icon="minus"
                                                className="minus" />
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
    title: PropTypes.string.isRequired,
    children: PropTypes.element || PropTypes.string

};
