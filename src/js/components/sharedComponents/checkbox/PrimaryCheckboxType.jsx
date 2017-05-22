/**
 * PrimaryCheckboxType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';
import { Set } from 'immutable';

import SecondaryCheckboxType from './SecondaryCheckboxType';
import CollapsedCheckboxType from './CollapsedCheckboxType';
import SingleCheckboxType from './SingleCheckboxType';

const propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    filters: React.PropTypes.array,
    bulkTypeChange: React.PropTypes.func,
    value: React.PropTypes.string,
    filterType: React.PropTypes.string,
    types: React.PropTypes.object,
    selectedCheckboxes: React.PropTypes.object,
    enableAnalytics: React.PropTypes.bool
};

const defaultProps = {
    id: '',
    name: '',
    filters: [],
    value: '',
    filterType: '',
    types: {},
    selectedCheckboxes: new Set(),
    enableAnalytics: false
};

const ga = require('react-ga');

export default class PrimaryCheckboxType extends React.Component {
    static logPrimaryTypeFilterEvent(type, filter) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Selected ${filter} Type`,
            label: type
        });
    }

    static logDeselectFilterEvent(type, filter) {
        ga.event({
            category: 'Search Page Filter Applied',
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

    componentWillMount() {
        this.compareFiltersToChildren(this.props);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.selectedCheckboxes.hashCode() !== this.props.selectedCheckboxes.hashCode()) {
            this.compareFiltersToChildren(nextProps);
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

        this.setState({
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
        let showChildren = true;
        let arrowState = 'expanded';

        if (this.state.allChildren) {
            // all the children are selected, deselect them
            this.props.bulkTypeChange({
                types: this.props.filters,
                direction: 'remove'
            });
            // collapse the children
            showChildren = false;
            arrowState = 'collapsed';

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
        this.setState({
            showSubItems: showChildren,
            arrowState
        });
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
            hideArrow={this.state.selectedChildren} />);

        let secondaryTypes = null;

        if (this.state.showSubItems) {
            secondaryTypes = this.props.filters.map((code) =>
                <SecondaryCheckboxType
                    {...this.props}
                    code={code}
                    name={this.props.types[code]}
                    key={`${this.props.id} - ${code}`}
                    id={`${this.props.id} - ${code}`} />);
        }

        if (this.props.filters.length === 0) {
            primaryTypes = (<SingleCheckboxType
                {...this.props}
                code={this.props.value}
                name={this.props.name}
                key={`${this.props.id} - ${this.props.value}`}
                id={`${this.props.id} - ${this.props.value}`} />);
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
