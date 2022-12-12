/**
 * AboutTheDataSearchBar.jsx
 * Created by Brian Petway 11/30/22
 */

import React, { useEffect, useCallback, useRef } from 'react';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { useDispatch } from 'react-redux';
import { Search } from 'components/sharedComponents/icons/Icons';
import PropTypes from "prop-types";

const propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    setAboutTheDataSearchValue: PropTypes.func,
    performSearch: PropTypes.func
};

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const AboutTheDataSearchBar = (props) => {
    const { searchTerm, setSearchTerm, performSearch } = props;
    const prevTerm = usePrevious({ searchTerm });
    const dispatch = useDispatch();

    const localPerformSearch = useCallback((term) => {
        if (term.length > 0 && term.length < 3) {
            // do not perform a search because the search term is too short
            // but DO allow an empty string (which indicates a request for the full list)
            // TODO: if there is something on redux clear it
            return;
        }

        performSearch(term);
    });

    const changedSearchValue = (e) => {
        setSearchTerm(e.target.value);
        // set it in redux too
        dispatch(aboutTheDataActions.setAboutTheDataSearchValue(e.target.value));
    };

    useEffect(() => {
        if (searchTerm && prevTerm !== searchTerm) {
            localPerformSearch(searchTerm);
        }
    }, [searchTerm]);

    return (
        <div className="atd-search-bar">
            <form>
                {/* eslint-disable-next-line react/void-dom-elements-no-children */}
                <input
                    className="search-field"
                    type="text"
                    placeholder="Search for a topic..."
                    onChange={changedSearchValue}
                    value={searchTerm} />
                <button
                    aria-label="Search"
                    className="search-button"
                    type="submit">
                    <Search alt="Search" />
                </button>
            </form>
        </div>
    );
};

AboutTheDataSearchBar.propTypes = propTypes;
export default AboutTheDataSearchBar;
