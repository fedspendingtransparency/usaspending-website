/**
 * FilterOption.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';

import FilterExpandButton from './FilterExpandButton';

const propTypes = {
    name: PropTypes.string,
    component: PropTypes.func,
    disabled: PropTypes.bool,
    defaultExpand: PropTypes.bool,
    accessory: PropTypes.func
};

const defaultProps = {
    defaultExpand: true
};

export default class FilterOption extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDirty: false,
            showFilter: true,
            arrowState: 'expanded'
        };

        // bind functions
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    componentWillMount() {
        if (!this.props.defaultExpand) {
            // check if filter is supposed to be collapsed by default
            this.setState({
                arrowState: 'collapsed',
                showFilter: false
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.defaultExpand !== this.props.defaultExpand && !this.state.isDirty) {
            this.checkIfAutoExpanded(this.props);
        }
    }

    checkIfAutoExpanded(nextProps) {
        if (nextProps.defaultExpand) {
            this.setState({
                isDirty: true,
                showFilter: true,
                arrowState: 'expanded'
            });
        }
        else {
            this.setState({
                showFilter: false,
                arrowState: 'collapsed'
            });
        }
    }

    toggleFilter(e) {
        e.preventDefault();

        // Don't open if the user has tapped on the information icon
        if (e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
            const newShowState = !this.state.showFilter;
            let newArrowState = 'collapsed';
            if (newShowState) {
                newArrowState = 'expanded';
            }
            this.setState({
                isDirty: true, showFilter: newShowState, arrowState: newArrowState
            });
        }
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
            <div
                className={`search-option${statusClass}`}
                role="group"
                aria-label={this.props.name}>
                <FilterExpandButton
                    accessory={this.props.accessory}
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
FilterOption.defaultProps = defaultProps;
