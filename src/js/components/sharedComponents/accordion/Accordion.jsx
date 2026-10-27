import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* props notes
title: shows in the top box, collapsed or open
color: theme color for border, collapsed background, and highlighted text within
backgroundColor: background of collapsed box
setOpen: pass setOpen to get the controlled/button variant; omit it for the native <details> disclosure
*/
const propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
    open: PropTypes.bool,
    iconClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    closedIcon: PropTypes.string,
    openIcon: PropTypes.string,
    setOpen: PropTypes.func,
    onToggle: PropTypes.func,
    defaultOpen: PropTypes.bool,
    selectedChipCount: PropTypes.number,
    headingClassName: PropTypes.string,
    faClassName: PropTypes.string,
    containerClassName: PropTypes.string
};

const Accordion = ({
    title,
    children,
    open,
    closedIcon = 'plus',
    openIcon = 'minus',
    iconClassName,
    setOpen,
    onToggle = () => {},
    defaultOpen,
    contentClassName = '',
    selectedChipCount = 0,
    headingClassName = '',
    containerClassName = '',
    faClassName = ''
}) => {
    const sectionClassName = open ? `open accordion--open accordion` : `accordion`;

    const selectedChip = (count) => ((count > 0) ?
        (<div className="selected-chip-count">{` ${count} selected`}</div>) :
        null
    );

    if (typeof setOpen !== 'function') return (
        <div className="accordion-container">
            <details
                data-testid="accordion"
                className={`accordion ${containerClassName}`}
                onToggle={onToggle}
                open={defaultOpen || undefined}>
                <summary className={`heading ${headingClassName}`}>
                    {title}
                    <div className="heading--chip-container">
                        {selectedChip(selectedChipCount)}
                        <FontAwesomeIcon
                            icon={closedIcon}
                            className={iconClassName || `plus ${faClassName}`}
                            key="open" />
                        <FontAwesomeIcon
                            icon={openIcon}
                            className={iconClassName || `minus ${faClassName}`}
                            key="close" />
                    </div>
                </summary>
                <div className={`content ${contentClassName}`}>{children}</div>
            </details>
        </div>
    );

    const buttonAriaLabel = !open ? 'Open toggle' : 'Close toggle';

    const toggleOpen = (e) => {
        e.stopPropagation();
        setOpen((prevOpen) => !prevOpen);
    };

    const keyClickToggle = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
        }
    };

    return (
        <div className={`accordion-container ${containerClassName}`}>
            <section
                data-testid="accordion"
                className={sectionClassName}>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div onClick={toggleOpen} onKeyDown={keyClickToggle} className={`heading ${headingClassName}`}>
                    {title}
                    <div className={`heading--chip-container ${faClassName}`}>
                        {selectedChip(selectedChipCount)}
                        <button
                            onClick={toggleOpen}
                            onKeyDown={keyClickToggle}
                            className="toggle"
                            aria-expanded={!!open}
                            aria-label={buttonAriaLabel}>
                            <FontAwesomeIcon
                                icon={closedIcon}
                                className={iconClassName || `plus ${faClassName}`}
                                key="open" />
                            <FontAwesomeIcon
                                icon={openIcon}
                                className={iconClassName || `minus ${faClassName}`}
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
