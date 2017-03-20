/**
 * SearchSidebar.jsx
 * Created by Emily Gullo 10/14/2016
 **/

import React from 'react';

import AwardTypeContainer from 'containers/search/filters/AwardTypeContainer';
import TimePeriodContainer from 'containers/search/filters/TimePeriodContainer';
import AgencyContainer from 'containers/search/filters/AgencyContainer';
import LocationSearchContainer from 'containers/search/filters/location/LocationSearchContainer';
import RecipientSearchContainer from 'containers/search/filters/recipient/RecipientSearchContainer';
import KeywordContainer from 'containers/search/filters/KeywordContainer';
import AwardIDSearchContainer from 'containers/search/filters/awardID/AwardIDSearchContainer';
import AwardAmountSearchContainer from
    'containers/search/filters/awardAmount/AwardAmountSearchContainer';

import SearchOption from './SearchOption';

const defaultProps = {
    options: [
        'Search',
        'Time Period',
        'Place of Performance',
        'Budget Categories',
        'Agencies',
        'Recipients',
        'Award Type',
        'Award ID',
        'Award Amount',
        'Other Award Items'
    ],
    components: [
        KeywordContainer,
        TimePeriodContainer,
        LocationSearchContainer,
        null,
        AgencyContainer,
        RecipientSearchContainer,
        AwardTypeContainer,
        AwardIDSearchContainer,
        AwardAmountSearchContainer,
        null
    ]
};

const propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    components: React.PropTypes.arrayOf(React.PropTypes.func)
};

export default class SearchSidebar extends React.Component {
    render() {
        const optionsList = this.props.options.map((name, i) => {
            const component = this.props.components[i];
            return (<SearchOption
                name={name}
                key={i}
                component={component}
                disabled={component === null} />);
        });

        return (
            <div className="search-sidebar">
                <h6 className="sidebar-header">Filter by:</h6>
                <div className="search-filters-wrapper">
                    {optionsList}
                </div>
            </div>
        );
    }
}

SearchSidebar.defaultProps = defaultProps;
SearchSidebar.propTypes = propTypes;
