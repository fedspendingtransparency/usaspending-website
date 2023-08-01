/**
  * TopFilterBar.jsx
  * Created by Kevin Li 12/13/16
  *
  * TopFilterBar is a React component that creates the sticky filter bar at the top of the search
  * results page. It receives parsed filter groups from its parent Redux container.
  *
  * @extends React.Component
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../sharedComponents/buttons/Button";

const propTypes = {
    filters: PropTypes.array,
    filterCount: PropTypes.number,
    groupGenerator: PropTypes.func,
    subaward: PropTypes.bool
};

const TopFilterBar = (props) => {
    const newAwardsOnlyPresent = props.filters.find((el) => el.code === 'newAwardsOnly');
    const filters = props.filters.map((filter) =>
        props.groupGenerator({
            filter,
            redux: props
        }));

    let filterBarHeader = `${props.filterCount} Active Filter`;
    if (props.filterCount !== 1) {
        filterBarHeader += 's';
    }
    filterBarHeader += ':';

    const dispatch = useDispatch();

    return (
        <div>
            <div
                className="search-top-filter-bar"
                role="complementary"
                aria-label="Currently applied search filters">
                <div className="search-top-filter-header">
                    <h2
                        className="header-title"
                        id="top-filter-bar-title">
                        {filterBarHeader}
                    </h2>
                    <Button
                        onClick={(e) => {
                            e.persist();
                            dispatch(showModal(window.location.href, 'filter'));
                        }}
                        onKeyUp={(e) => {
                            e.persist();
                            if (e.key === 'Enter') {
                                dispatch(showModal(window.location.href, 'filter'));
                            }
                        }}
                        copy="Learn how active filters work"
                        buttonTitle="filter modal"
                        buttonSize="sm"
                        buttonType="text"
                        backgroundColor="light"
                        imageAlignment="right"
                        image={<FontAwesomeIcon icon="window-restore" />} />
                </div>
                <div className="search-top-filters">
                    <div
                        className={`search-top-filters-content ${newAwardsOnlyPresent ? 'newAwardsOnlyPresent' : ''} ${props.subaward ? 'subAward' : ''}`}
                        role="list">
                        {filters}
                    </div>
                </div>
            </div>
        </div>
    );
};

TopFilterBar.propTypes = propTypes;

export default TopFilterBar;
