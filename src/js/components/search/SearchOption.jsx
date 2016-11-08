/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import SearchBox from '../sharedComponents/SearchBox';
import TimePeriod from './filters/timePeriod/TimePeriod';

const propTypes = {
    name: React.PropTypes.string
};

export default class SearchOption extends React.Component {
    render() {
        switch (this.props.name) {
            case 'Keywords':
                return (<div className="search-option"><SearchBox /></div>);
            case 'AwardType':
                return (<div className="search-option"><AwardTypeContainer /></div>);
            case 'TimePeriod':
                return (<div className="search-option"><TimePeriod /></div>);
            default:
                return (<div className="search-option"><b>{this.props.name}</b></div>);
        }
    }
}

SearchOption.propTypes = propTypes;
