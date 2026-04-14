/**
  * TopFilterBar.jsx
  * Created by Kevin Li 12/13/16
  *
  * TopFilterBar is a React component that creates the sticky filter bar at the top of the search
  * results page. It receives parsed filter groups from its parent Redux container.
  *
  * @extends React.Component
  **/

import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TopFilterGroupGenerator from './TopFilterGroupGenerator';
import BarHeader from "./header/BarHeader";

const propTypes = {
    filters: PropTypes.array,
    filterCount: PropTypes.number,
    resultsView: PropTypes.bool
};

// eslint-disable-next-line prefer-arrow-callback
const TopFilterBar = memo(function TopFilterBar({ filters, filterCount, resultsView }) {
    const [expandedFilters, setExpandedFilters] = useState(false);
    const [fadeClass, setFadeClass] = useState('');
    const [bottom, setBottom] = useState(false);
    const contentRef = useRef(null);

    const newAwardsOnlyPresent = filters.find(({ code }) => code === 'newAwardsOnly');

    useEffect(() => {
        // max heights of the .search-top-filters-content (located in topFilterBar.scss)
        const filtersMaxHeight = expandedFilters ? 280 : 150;
        const offsetHeight = contentRef.current?.offsetHeight;
        const atMaxHeight = filtersMaxHeight <= offsetHeight;

        let newClass = '';

        // if either
        //         - the active filters are expanded,
        //           and the div is at max height,
        //           and not scrolled to the bottom
        //      0R
        //         - the filters are not expanded
        //           and the div is at max height
        //    then add .fade to the div
        if (
            (expandedFilters && atMaxHeight && !bottom) ||
            (!expandedFilters && atMaxHeight)
        ) newClass = ' fade';

        setFadeClass(newClass);
    }, [bottom, expandedFilters, filters]);

    /**
    *   useEffect for adding an eventListener that detects when the user has
     *   scrolled to the bottom of .search-top-filters-content
    * */
    useEffect(() => {
        const ref = contentRef.current;
        const onscroll = () => {
            const scrollTop = contentRef.current?.scrollTop;
            const scrollHeight = contentRef.current?.scrollHeight;
            const clientHeight = contentRef.current?.clientHeight;

            const scrolledTo = scrollHeight - clientHeight;
            const isReachBottom = scrollTop === scrolledTo;

            if (isReachBottom) setBottom(true);
            else setBottom(false);
        };

        contentRef.current.addEventListener("scroll", onscroll);

        return () => {
            ref.removeEventListener("scroll", onscroll);
        };
    }, []);

    const groups = filters.map(({ code, name }) => (
        <TopFilterGroupGenerator resultsView={resultsView} code={code} name={name} />
    ));

    return (
        <div>
            <div
                className="search-top-filter-bar"
                role="complementary"
                aria-label="Currently applied search filters">
                <BarHeader
                    resultsView={resultsView}
                    filterCount={filterCount}
                    expandedFilters={expandedFilters}
                    setExpandedFilters={setExpandedFilters} />
                <div className="search-top-filters">
                    <div
                        className={`search-top-filters-content${
                            newAwardsOnlyPresent ? ' newAwardsOnlyPresent' : ''
                        }${
                            expandedFilters ? ' expanded' : ' collapsed'
                        }${
                            fadeClass
                        }`}
                        ref={contentRef} >
                        {groups}
                    </div>
                </div>
            </div>
        </div>
    );
});

TopFilterBar.propTypes = propTypes;

export default TopFilterBar;
