/**
 * AboutTheDataSearchBar.jsx
 * Created by Brian Petway 11/30/22
 */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import usePrevious from "../../hooks/usePrevious";
import { setAboutTheDataSearchValue } from
    "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { Search } from '../sharedComponents/icons/Icons';

const propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    performSearch: PropTypes.func,
    clearSearch: PropTypes.func
};

const AboutTheDataSearchBar = ({
    searchTerm, setSearchTerm, performSearch, clearSearch
}) => {
    const prevTerm = usePrevious({ searchTerm });
    const dispatch = useDispatch();

    const changedSearchValue = (e) => {
        setSearchTerm(e.target.value);
        // set it in redux too
        dispatch(setAboutTheDataSearchValue(e.target.value));
    };

    const submitSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchTerm);
        dispatch(setAboutTheDataSearchValue(searchTerm));
    };

    useEffect(() => {
        if (prevTerm !== searchTerm) {
            // do not perform a search if the search term is too short
            if (searchTerm.length >= 0 && searchTerm.length < 3) {
                // clear if there are already search results
                clearSearch();
                return;
            }

            performSearch(searchTerm);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <div className="atd-search-bar">
            <form onSubmit={submitSearch}>
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
