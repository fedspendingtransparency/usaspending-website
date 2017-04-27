/**
 * SearchBar.jsx
 * Created by Kevin Li 4/27/17
 */

import React from 'react';
import * as Icons from '../../icons/Icons';

export default class SearchBar extends React.Component {
    render() {
        return (
            <div className="header-search-bar">
                <input
                    className="header-search-field"
                    type="text"
                    placeholder="Search (coming soon)"
                    disabled />
                <button
                    aria-label="Search"
                    className="header-search-button"
                    disabled>
                    <Icons.Search alt="Search" />
                </button>
            </div>
        );
    }
}
