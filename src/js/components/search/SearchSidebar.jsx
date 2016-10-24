/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import SearchOption from './SearchOption.jsx';

const defaultProps = {
	options: [
		'Keywords',
		'Award Type',
		'Time Period',
		'Primary Place of Performance',
		'Agencies',
		'Recipient Information',
		'Award ID',
		'Award Amount',
		'Appropriations Account',
		'CFDA Program',
		'Contract Specific Details'
	]
};

export default class SearchSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
		const optionsList = this.props.options.map((name, i) => {
			return <SearchOption name={name} key={i}/>;
		});
		
        return (
            <div className="search-sidebar">
                <h3>Narrow By</h3>
                {optionsList}
            </div>
        );
    }
}

SearchSidebar.defaultProps = defaultProps;