/**
 * BreakdownDropdown.jsx
 * Created by Kevin Li 8/17/17
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

import { dropdownScopes, rootScopes, icons } from 'dataMapping/explorer/dropdownScopes';
import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
import DropdownItem from './DropdownItem';
import { usePrevious } from "../../../../../helpers/";

const propTypes = {
    isRoot: PropTypes.bool,
    active: PropTypes.object,
    trail: PropTypes.array,
    root: PropTypes.string,
    changeSubdivisionType: PropTypes.func,
    changeView: PropTypes.func,
    viewType: PropTypes.string
};

const BreakdownDropdown = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [options, setOptions] = useState([]);
    const [active, setActive] = useState(null);
    const history = useHistory();
    const prevProps = usePrevious(props);

    const wrapperRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (expanded && wrapperRef?.current && !wrapperRef?.current.contains(event.target)) {
            setExpanded(false);
        }
    });

    const prepareOptions = () => {
        let tempOptions = [];
        let tempActive = props.root;
        if (props.isRoot) {
            // we're at the root level, so populate the full list
            tempOptions = rootScopes;
        }
        else {
            // we're not at the root, so we need to determine our current position in the tree using
            // the last filter that was applied
            const optionTree = dropdownScopes[props.root];

            const lastTrailItem = props.trail[props.trail.length - 1];
            const lastFilter = lastTrailItem.subdivision;

            const currentIndex = Math.min(optionTree.indexOf(lastFilter),
                optionTree.length - 1);
            const accountDepth = optionTree.indexOf('federal_account');
            const programActivityIndex = optionTree.indexOf('program_activity');

            // Check if at or above the Federal Account level
            if (currentIndex <= accountDepth) {
                if (programActivityIndex !== -1) {
                    // remove program activity from the options
                    optionTree.splice(programActivityIndex, 1);
                }
            }

            const remainingTree = optionTree.slice(currentIndex);

            tempOptions = remainingTree;

            tempActive = props.active.subdivision;
        }

        setOptions(tempOptions);
        setActive(tempActive);
    };


    useEffect(() => {
        prepareOptions(props);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        if (prevProps?.active !== props.active) {
            prepareOptions(props);
        }
        else if (prevProps?.root !== props.root) {
            prepareOptions(props);
        }
        else if (prevProps?.isRoot !== props.isRoot) {
            prepareOptions(props);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [props.active, props.root, props.isRoot, prevProps]);

    useEffect(() => {
        if (expanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [expanded]);

    const toggleMenu = () => {
        setExpanded((prevState) => !prevState);
    };

    const pickItem = (item) => {
        setExpanded(false);
        if (props.isRoot && item !== props.root) {
            // TODO redirect to the correct root URL
            history.push(`/explorer/${item}`);
        }
        else if (!props.isRoot) {
            props.changeSubdivisionType(item);
        }
    };

    let dropdown = null;
    if (expanded) {
        const items = options.map((option) => (
            <DropdownItem
                key={option}
                value={option}
                pickItem={pickItem} />
        ));
        dropdown = (
            <ul className="dropdown__menu">
                {items}
            </ul>);
    }

    let icon = null;
    const IconType = icons[active];
    if (IconType) {
        icon = <IconType />;
    }

    return (
        <div className="explorer-toolbar" ref={wrapperRef}>
            <div className="explorer-toolbar__breakdown">
                <div className="breakdown__label">
                    See the breakdown by:
                </div>
                <div className="breakdown__dropdown">
                    <button
                        className="dropdown__selection"
                        onClick={toggleMenu}>
                        <div className="dropdown__icon">
                            {icon}
                        </div>
                        <div className="dropdown__label">
                            {sidebarTypes[active]}
                        </div>
                        <div className="dropdown__arrow">
                            <FontAwesomeIcon icon="angle-down" />
                        </div>
                    </button>

                    {dropdown}
                </div>
            </div>
            <div className="view-buttons">
                <ViewTypeButton
                    value="treemap"
                    label="Treemap"
                    icon="th-large"
                    active={props.viewType === 'treemap'}
                    changeView={props.changeView} />
                <ViewTypeButton
                    value="table"
                    label="Table"
                    icon="table"
                    active={props.viewType === 'table'}
                    changeView={props.changeView} />
            </div>
        </div>
    );
};

BreakdownDropdown.propTypes = propTypes;
export default BreakdownDropdown;
