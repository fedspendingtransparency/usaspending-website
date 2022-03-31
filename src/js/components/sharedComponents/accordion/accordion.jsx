import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './accordion.scss';

const Accordion = ({ title, children }) => {
    const [closed, setClosed] = useState(true);

    const toggleOpen = (e) => {
        e.stopPropagation();
        setClosed(!closed);
    };

    return (
        <div className="accordion-container">
            <section className={!closed ? `accordion open accordion--open` : `accordion`}>
                <div onClick={toggleOpen} className="heading">
                    {title}
                    <button
                        onClick={toggleOpen}
                        className="toggle"
                        aria-label={closed ? 'Open toggle' : 'Close toggle'}>
                        <FontAwesomeIcon
                            icon="plus"
                            className="plus"
                        />
                        <FontAwesomeIcon
                            icon="minus"
                            className="minus"
                        />
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
    children: PropTypes.element

};
