/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import SearchBox from './filters/keyword/SearchBox';
import TimePeriod from './filters/timePeriod/TimePeriod';
import FilterExpandButton from './FilterExpandButton';

const propTypes = {
    name: React.PropTypes.string
};

export default class SearchOption extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            arrowState: 'collapsed'
        };
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
    }

    render() {
        let searchOption = null;
        switch (this.props.name) {
            case 'Keywords':
                searchOption = (<SearchBox
                    showFilter={this.state.showFilter} />);
                break;
            case 'Award Type':
                searchOption = (<AwardTypeContainer
                    showFilter={this.state.showFilter} />);
                break;
            case 'Time Period':
                searchOption = (<TimePeriod
                    showFilter={this.state.showFilter} />);
                break;
            default:
                searchOption = null;
        }

        return (<div className="search-option">
            <FilterExpandButton
                hidden={this.state.showFilter}
                toggleFilter={this.toggleFilter.bind(this)}
                arrowState={this.state.arrowState} />
            <h6 className="filter-header">{this.props.name}</h6>
            {searchOption}
        </div>);
    }
}

SearchOption.propTypes = propTypes;
