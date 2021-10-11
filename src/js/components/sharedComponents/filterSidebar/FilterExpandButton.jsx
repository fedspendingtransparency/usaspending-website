/**
  * FilterExpandButton.jsx
  * Created by Emily Gullo
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { TooltipWrapper } from 'data-transparency-ui';

const propTypes = {
    hideArrow: PropTypes.bool,
    toggleFilter: PropTypes.func,
    arrowState: PropTypes.string,
    name: PropTypes.string,
    tooltip: PropTypes.func,
    disabled: PropTypes.bool,
    accessory: PropTypes.func,
    glossarySlug: PropTypes.string,
    className: PropTypes.string
};

const ariaDescription = 'accessory-view';

const FilterExpandButton = (props) => {
    const hiddenClass = props.hideArrow ? ' hide' : '';

    const icon = props.arrowState === 'expanded' ?
        <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />;

    // TODO
    const glossaryLink = props.glossarySlug ? (
        <div className="filter-toggle__glossary">
            <Link to="/search"><FontAwesomeIcon icon="book" /></Link>
        </div>
    ) : null;

    const filterClassName = props.className ? ` ${props.className}` : '';

    return (
        <div className="filter-toggle">
            <div
                role="button"
                className={`filter-toggle__button ${hiddenClass}`}
                onClick={props.toggleFilter}
                onKeyDown={props.toggleFilter}
                disabled={props.disabled}
                title={props.name}
                aria-label={props.name}
                aria-expanded={props.arrowState === 'expanded'}
                aria-describedby={props.accessory ? ariaDescription : ''}>
                {icon}
                <div className={`filter-toggle__name${filterClassName}`}>
                    <span>{props.name}</span>
                    {props.tooltip && <TooltipWrapper icon="info" tooltipComponent={props.tooltip} /> }
                </div>
            </div>
            {glossaryLink}
            <div className="filter-toggle__accessory">
                {props.accessory && (
                    <div
                        tabIndex="0"
                        id="accessory-view"
                        role="toolbar">
                        <props.accessory />
                    </div>
                )}
            </div>
        </div>
    );
};

FilterExpandButton.propTypes = propTypes;
export default FilterExpandButton;
