/**
 * AboutTheDataSearchBar.jsx
 * Created by Brian Petway 11/30/22
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAboutTheDataSearchValue } from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { Search } from '../sharedComponents/icons/Icons';

const AboutTheDataSearchBar = () => {
    const searchTerm = useSelector((state) => state.aboutTheDataSidebar.search.input);
    const dispatch = useDispatch();

    const changedSearchValue = (e) => dispatch(setAboutTheDataSearchValue(e.target.value));

    const submitSearch = (e) => e.preventDefault();

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

export default AboutTheDataSearchBar;
