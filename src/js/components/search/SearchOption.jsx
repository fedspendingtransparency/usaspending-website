/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import SearchBox from './filters/keyword/SearchBox';
import TimePeriod from './filters/timePeriod/TimePeriod';

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
        switch (this.props.name) {
            case 'Keywords':
                return (<div className="search-option">
                    <SearchBox
                        toggleFilter={this.toggleFilter.bind(this)}
                        showFilter={this.state.showFilter}
                        arrowState={this.state.arrowState} />
                </div>);
            case 'AwardType':
                return (<div className="search-option"><AwardTypeContainer
                    toggleFilter={this.toggleFilter.bind(this)}
                    showFilter={this.state.showFilter}
                    arrowState={this.state.arrowState} /></div>);
            case 'TimePeriod':
                return (<div className="search-option"><TimePeriod
                    toggleFilter={this.toggleFilter.bind(this)}
                    showFilter={this.state.showFilter}
                    arrowState={this.state.arrowState} /></div>);
            default:
                return (<div className="search-option"><b>{this.props.name}</b></div>);
        }
    }
}

SearchOption.propTypes = propTypes;
