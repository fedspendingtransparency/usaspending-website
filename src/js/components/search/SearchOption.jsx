/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'containers/search/filters/AgencyContainer';
import LocationSearchContainer from 'containers/search/filters/location/LocationSearchContainer';
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import SearchBox from './filters/keyword/SearchBox';
import FilterExpandButton from './FilterExpandButton';

const propTypes = {
    name: React.PropTypes.string
};

const ga = require('react-ga');

export default class SearchOption extends React.Component {

    static logFilterEvent(name) {
        ga.event({
            category: 'Search Filters',
            action: 'Expanded Filter',
            label: name
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            arrowState: 'collapsed'
        };

        // bind functions
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter(e) {
        e.preventDefault();

        const newShowState = !this.state.showFilter;
        let newArrowState = 'collapsed';
        if (newShowState) {
            newArrowState = 'expanded';
        }
        this.setState({
            showFilter: newShowState,
            arrowState: newArrowState
        });

        const filterName = this.props.name;
        SearchOption.logFilterEvent(filterName);
    }

    render() {
        let searchOption = null;
        switch (this.props.name) {
            case 'Search':
                searchOption = (<SearchBox />);
                break;
            case 'Award Type':
                searchOption = (<AwardTypeContainer />);
                break;
            case 'Time Period':
                searchOption = (<TimePeriodContainer />);
                break;
            case 'Agencies':
                searchOption = (<AgencyContainer />);
                break;
            case 'Location':
                searchOption = (<LocationSearchContainer />);
                break;
            case 'Recipient Information':
                searchOption = (<RecipientSearchContainer />);
                break;
            default:
                searchOption = null;
        }

        if (this.state.showFilter !== true) {
            searchOption = null;
        }

        return (
            <div className="search-option">
                <FilterExpandButton
                    hidden={this.state.showFilter}
                    toggleFilter={this.toggleFilter}
                    arrowState={this.state.arrowState}
                    name={this.props.name} />
                {searchOption}
            </div>
        );
    }
}

SearchOption.propTypes = propTypes;
