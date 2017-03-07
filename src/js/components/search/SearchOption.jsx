/**
 * SearchOption.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'containers/search/filters/AgencyContainer';
import LocationSearchContainer from 'containers/search/filters/location/LocationSearchContainer';
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import AwardAmountSearchContainer from 'containers/search/filters/awardAmount/AwardAmountSearchContainer';
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
            const filterName = this.props.name;
            SearchOption.logFilterEvent(filterName);
        }
        this.setState({
            showFilter: newShowState,
            arrowState: newArrowState
        });
    }

    render() {
        const comingSoonModule = (
            <div>
                <div className="coming-soon-icon">
                    <Icons.ExclamationCircle />
                </div>
                <span className="coming-soon-label">Coming Soon</span>
            </div>
        );
        let disabledStatus = false;
        let comingSoon = null;
        let searchOption = null;
        let statusClass = '';
        switch (this.props.name) {
            case 'Search':
                disabledStatus = true;
                comingSoon = comingSoonModule;
                searchOption = (<SearchBox />);
                statusClass = ' coming-soon';
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
            case 'Place of Performance':
                searchOption = (<LocationSearchContainer />);
                break;
            case 'Recipients':
                searchOption = (<RecipientSearchContainer />);
                break;
            case 'Award Amount':
                searchOption = (<AwardAmountSearchContainer />);
                break;
            default:
                disabledStatus = true;
                comingSoon = comingSoonModule;
                searchOption = null;
                statusClass = ' coming-soon';
        }

        if (this.state.showFilter !== true) {
            searchOption = null;
        }

        return (
            <div className={`search-option${statusClass}`}>
                <FilterExpandButton
                    hidden={this.state.showFilter}
                    toggleFilter={this.toggleFilter}
                    arrowState={this.state.arrowState}
                    name={this.props.name}
                    disabled={disabledStatus} />
                {searchOption}
                {comingSoon}
            </div>
        );
    }
}

SearchOption.propTypes = propTypes;
