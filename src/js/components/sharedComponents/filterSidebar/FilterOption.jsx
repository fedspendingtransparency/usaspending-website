/**
 * FilterOption.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';

import FilterExpandButton from './FilterExpandButton';

const propTypes = {
    name: React.PropTypes.string,
    component: React.PropTypes.func,
    disabled: React.PropTypes.bool
};

const ga = require('react-ga');

export default class FilterOption extends React.Component {

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
            FilterOption.logFilterEvent(filterName);
        }
        this.setState({
            showFilter: newShowState,
            arrowState: newArrowState
        });
    }

    render() {
        const comingSoonModule = (<ComingSoonLabel />);
        let disabledStatus = false;
        let comingSoon = null;
        let searchOption = null;
        let statusClass = '';
        if (this.props.disabled) {
            disabledStatus = true;
            comingSoon = comingSoonModule;
            searchOption = null;
            statusClass = ' coming-soon';
        }
        else {
            const Component = this.props.component;
            searchOption = <Component />;
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

FilterOption.propTypes = propTypes;
