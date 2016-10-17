/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import SearchOption from './SearchOption.jsx';

export default class SearchSidebar extends React.Component {
    constructor(props) {
        super(props);

		this.state = {
			options: []
		}
    }

	componentDidMount(){
		this.setState({
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
		})
	}


    render() {
        return (
            <div className="search-sidebar">
                <h2>Narrow By</h2>
                {this.state.options.map(function(name) {
                    return <SearchOption name={name}/>;
                })}
            </div>
        );
    }
}
