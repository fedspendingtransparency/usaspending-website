/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import SearchOption from './SearchOption.jsx';

export default class Footer extends React.Component {
    render() {
        const year = new Date().getFullYear();
        return (
            <div className="search-sidebar">
            	<SearchOption />
            </div>
        );
    }
}
