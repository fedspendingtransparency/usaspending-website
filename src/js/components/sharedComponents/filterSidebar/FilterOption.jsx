/**
 * FilterOption.jsx
 * Created by Kevin Li 3/20/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import FilterExpandButton from './FilterExpandButton';

const propTypes = {
    name: PropTypes.string,
    tooltip: PropTypes.element,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    disabled: PropTypes.bool,
    defaultExpand: PropTypes.bool,
    accessory: PropTypes.func,
    glossarySlug: PropTypes.string
};

const FilterOption = ({
    name,
    tooltip,
    component,
    disabled,
    defaultExpand = true,
    accessory,
    glossarySlug
}) => {
    const [isDirty, setIsDirty] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [arrowState, setArrowState] = useState('collapsed');

    const comingSoonModule = (<ComingSoonLabel />);
    let disabledStatus = false;
    let comingSoon;
    let searchOption;
    let statusClass = '';

    if (disabled) {
        disabledStatus = true;
        comingSoon = comingSoonModule;
        searchOption = null;
        statusClass = ' coming-soon';
    }
    else {
        const Component = component;
        searchOption = <Component />;
    }

    if (showFilter !== true) {
        searchOption = null;
    }

    const setArrowAndFilterState = () => {
        if (defaultExpand) {
            // check if filter is supposed to be collapsed by default
            setArrowState('expanded');
            setShowFilter(true);
        }
    };

    const checkIfAutoExpanded = () => {
        if (defaultExpand) {
            setIsDirty(true);
            setShowFilter(true);
            setArrowState('expanded');
        }
        else {
            setShowFilter(false);
            setArrowState('collapsed');
        }
    };

    const toggleFilter = (e) => {
        e.preventDefault();

        // Don't open if the user has tapped on the information icon
        if (e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
            const newShowState = !showFilter;
            let newArrowState = 'collapsed';
            if (newShowState) {
                newArrowState = 'expanded';
            }
            setIsDirty(true);
            setShowFilter(newShowState);
            setArrowState(newArrowState);
        }
    };

    useEffect(() => {
        setArrowAndFilterState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isDirty) {
            checkIfAutoExpanded();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultExpand]);

    return (
        <div
            className={`search-option${statusClass}`}
            role="group"
            aria-label={name}>
            <FilterExpandButton
                accessory={accessory}
                hidden={showFilter}
                toggleFilter={toggleFilter}
                arrowState={arrowState}
                name={name}
                tooltip={tooltip}
                disabled={disabledStatus}
                glossarySlug={glossarySlug} />
            {searchOption}
            {comingSoon}
        </div>
    );
};

FilterOption.propTypes = propTypes;
export default FilterOption;
