/**
 * PrimaryCheckboxType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import { uniqueId } from 'lodash';

import Analytics from 'helpers/analytics/Analytics';

import SecondaryCheckboxType from './SecondaryCheckboxType';
import CollapsedCheckboxType from './CollapsedCheckboxType';
import SingleCheckboxType from './SingleCheckboxType';

const propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    filters: PropTypes.array,
    bulkTypeChange: PropTypes.func,
    value: PropTypes.string,
    filterType: PropTypes.string,
    types: PropTypes.object,
    selectedCheckboxes: PropTypes.object,
    enableAnalytics: PropTypes.bool,
    restrictChildren: PropTypes.bool
};

const defaultProps = {
    name: '',
    filters: [],
    value: '',
    filterType: '',
    types: {},
    selectedCheckboxes: new Set(),
    enableAnalytics: false,
    restrictChildren: false
};

export default class PrimaryCheckboxType extends React.Component {
    static logPrimaryTypeFilterEvent(type, filter) {
        Analytics.event({
            category: 'Search Filter Interaction',
            action: `Selected ${filter} Type`,
            label: type
        });
    }

    static logDeselectFilterEvent(type, filter) {
        Analytics.event({
            category: 'Search Filter Interaction',
            action: `Deselected ${filter} Type Children`,
            label: type
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            showSubItems: false,
            arrowState: 'collapsed',
            selectedChildren: false,
            allChildren: false
        };

        // bind functions
        this.toggleSubItems = this.toggleSubItems.bind(this);
        this.toggleChildren = this.toggleChildren.bind(this);
    }

    componentDidMount() {
        this.compareFiltersToChildren(this.props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCheckboxes.hashCode() !== this.props.selectedCheckboxes.hashCode()) {
            this.compareFiltersToChildren(this.props);
        }
    }

    compareFiltersToChildren(props) {
        // check to see if the children are all selected or not
        let allSelected = true;
        let someSelected = false;

        for (const code of props.filters) {
            if (!props.selectedCheckboxes.has(code)) {
                allSelected = false;
            }
            else {
                someSelected = true;
            }
        }

        // auto-expand when some but not all children are selected
        let showSubItems = this.state.showSubItems;
        if (!allSelected && someSelected) {
            showSubItems = true;
        }

        this.setState({
            showSubItems,
            allChildren: allSelected,
            selectedChildren: someSelected
        });
    }

    toggleSubItems() {
        const newShowState = !this.state.showSubItems;
        let newArrowState = 'collapsed';
        if (newShowState) {
            newArrowState = 'expanded';
        }

        this.setState({
            showSubItems: newShowState,
            arrowState: newArrowState
        });
    }

    toggleChildren() {
        if (this.state.allChildren) {
            // all the children are selected, deselect them
            this.props.bulkTypeChange({
                types: this.props.filters,
                direction: 'remove'
            });

            // Analytics
            if (this.props.enableAnalytics) {
                PrimaryCheckboxType.logDeselectFilterEvent(this.props.name, this.props.filterType);
            }
        }
        else {
            // not all the children are selected, select them all
            this.props.bulkTypeChange({
                types: this.props.filters,
                direction: 'add'
            });

            // Analytics
            if (this.props.enableAnalytics) {
                PrimaryCheckboxType.logPrimaryTypeFilterEvent(
                    this.props.name, this.props.filterType);
            }
        }
    }

    render() {
        let primaryTypes = (<CollapsedCheckboxType
            id={this.props.id}
            name={this.props.name}
            code={this.props.value}
            selected={this.state.allChildren}
            arrowState={this.state.arrowState}
            toggleExpand={this.toggleSubItems}
            toggleChildren={this.toggleChildren}
            hideArrow={this.state.selectedChildren || this.props.restrictChildren} />);

        let secondaryTypes = null;

        if (this.state.showSubItems) {
            secondaryTypes = this.props.filters.map((code) =>
                (<SecondaryCheckboxType
                    {...this.props}
                    code={code}
                    name={this.props.types[code]}
                    key={`${this.props.id} - ${code}`}
                    id={`secondary-checkbox-${uniqueId()}`} />));
        }

        if (this.props.filters.length === 0) {
            primaryTypes = (<SingleCheckboxType
                {...this.props}
                code={this.props.value}
                name={this.props.name}
                key={`${this.props.id} - ${this.props.value}`}
                id={`primary-checkbox-${uniqueId()}`} />);
        }

        return (
            <li className="checkbox-set">
                <div className="primary-checkbox">
                    {primaryTypes}
                </div>
                <ul className="secondary-checkbox-set">
                    {secondaryTypes}
                </ul>
            </li>
        );
    }
}

PrimaryCheckboxType.propTypes = propTypes;
PrimaryCheckboxType.defaultProps = defaultProps;
