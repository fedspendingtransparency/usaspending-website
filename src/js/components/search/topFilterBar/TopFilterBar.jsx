/**
  * TopFilterBar.jsx
  * Created by Kevin Li 12/13/16
  *
  * TopFilterBar is a React component that creates the sticky filter bar at the top of the search
  * results page. It receives parsed filter groups from its parent Redux container.
  *
  * @extends React.Component
  **/

import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { showModal } from 'redux/actions/modal/modalActions';
import { topFilterGroupGenerator } from
    'components/search/topFilterBar/TopFilterGroupGenerator';

const propTypes = {
    filters: PropTypes.array,
    filterCount: PropTypes.number
};

// eslint-disable-next-line prefer-arrow-callback
const TopFilterBar = memo(function TopFilterBar({ filters, filterCount }) {
    const newAwardsOnlyPresent = filters.find(({ code }) => code === 'newAwardsOnly');

    const groups = filters.map((filter) =>
        topFilterGroupGenerator({
            filter
        }));

    const dispatch = useDispatch();

    const onClick = useCallback((e) => {
        e.persist();
        dispatch(showModal(window.location.href, 'filter'));
    }, [dispatch]);

    const onKeyUp = useCallback((e) => {
        e.persist();
        if (e.key === 'Enter') {
            dispatch(showModal(window.location.href, 'filter'));
        }
    }, [dispatch]);

    const image = useMemo(() => (<FontAwesomeIcon icon="window-restore" />), []);

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
                        {`${filterCount} Active Filter${filterCount !== 1 ? 's' : ''}:`}
                    </h2>
                    <Button
                        onClick={onClick}
                        onKeyUp={onKeyUp}
                        copy="Learn how active filters work"
                        buttonTitle="filter modal"
                        buttonSize="sm"
                        buttonType="text"
                        backgroundColor="light"
                        imageAlignment="right"
                        image={image} />
                </div>
                <div className="search-top-filters">
                    <div
                        className={`search-top-filters-content ${
                            newAwardsOnlyPresent ? 'newAwardsOnlyPresent' : ''
                        }`}>
                        {groups}
                    </div>
                </div>
            </div>
        </div>
    );
});

TopFilterBar.propTypes = propTypes;

export default TopFilterBar;
