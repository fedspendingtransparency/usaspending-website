/**
  * FilterExpandButton.jsx
  * Created by Emily Gullo
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TooltipWrapper } from 'data-transparency-ui';
import GlossaryLink from 'components/sharedComponents/GlossaryLink';

const propTypes = {
    toggleFilter: PropTypes.func,
    arrowState: PropTypes.string,
    name: PropTypes.string,
    tooltip: PropTypes.element,
    disabled: PropTypes.bool,
    accessory: PropTypes.func,
    glossarySlug: PropTypes.string
};

const ariaDescription = 'accessory-view';

const FilterExpandButton = (props) => {
    const icon = props.arrowState === 'expanded' ?
        <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />;

    return (
        <div className="filter-toggle">
            <button
                className="filter-toggle__button"
                onClick={props.toggleFilter}
                disabled={props.disabled}
                title={props.name}
                aria-label={props.name}
                aria-expanded={props.arrowState === 'expanded'}
                aria-describedby={props.accessory ? ariaDescription : ''}>
                {icon}
                {props.name}
                {props.tooltip && <TooltipWrapper icon="info" tooltipComponent={props.tooltip} /> }
            </button>
            {props.glossarySlug && <div className="filter-toggle__glossary"><GlossaryLink term={props.glossarySlug} /></div>}
            {props.accessory && (
                <div
                    className="filter-toggle__accessory"
                    tabIndex="-1"
                    id="accessory-view">
                    <props.accessory />
                </div>
            )}
        </div>
    );
};

FilterExpandButton.propTypes = propTypes;
export default FilterExpandButton;
