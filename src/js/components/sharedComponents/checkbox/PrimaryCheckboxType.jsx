/**
 * PrimaryCheckboxType.jsx
 * Created by michaelbray on 5/17/17.
 */

import React from 'react';

import { recipientTypes } from 'dataMapping/search/recipientType';
import { Set } from 'immutable';

import SecondaryCheckboxType from './SecondaryCheckboxType';
import CollapsedCheckboxType from './CollapsedCheckboxType';
import SingleCheckboxType from './SingleCheckboxType';

const propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    filters: React.PropTypes.array,
    bulkRecipientTypeChange: React.PropTypes.func,
    value: React.PropTypes.string,
    filterType: React.PropTypes.string,
    selectedCheckboxes: React.PropTypes.object
};

const defaultProps = {
    id: '',
    name: '',
    filters: [],
    value: '',
    filterType: '',
    selectedCheckboxes: new Set()
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

    componentDidMount() {
        this.compareFiltersToChildren();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedCheckboxes.hashCode() !== this.props.selectedCheckboxes.hashCode()) {
            this.compareFiltersToChildren();
        }
    }

    compareFiltersToChildren() {
        // check to see if the children are all selected or not
        let allSelected = true;
        let someSelected = false;

        for (const code of this.props.filters) {
            if (!this.props.selectedCheckboxes.has(code)) {
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
            this.props.bulkRecipientTypeChange({
                recipientTypes: this.props.filters,
                direction: 'remove'
            });
            // collapse the children
            showChildren = false;
            arrowState = 'collapsed';
            // Analytics
            PrimaryCheckboxType.logDeselectFilterEvent(this.props.name, this.props.filterType);
        }
        else {
            // not all the children are selected, select them all
            this.props.bulkRecipientTypeChange({
                recipientTypes: this.props.filters,
                direction: 'add'
            });
            // Analytics
            PrimaryCheckboxType.logPrimaryTypeFilterEvent(this.props.name, this.props.filterType);
        }
        this.setState({
            showSubItems: showChildren,
            arrowState
        });
    }

    render() {
        let primaryRecipient = (<CollapsedCheckboxType
            id={this.props.id}
            name={this.props.name}
            code={this.props.value}
            selected={this.state.allChildren}
            arrowState={this.state.arrowState}
            toggleExpand={this.toggleSubItems}
            toggleChildren={this.toggleChildren}
            hideArrow={this.state.selectedChildren} />);

        let secondaryRecipientTypes = null;

        if (this.state.showSubItems) {
            secondaryRecipientTypes = this.props.filters.map((code) =>
                <SecondaryCheckboxType
                    {...this.props}
                    code={code}
                    name={recipientTypes[code]}
                    key={`${this.props.id} - ${code}`}
                    id={`${this.props.id} - ${code}`} />);
        }

        if (this.props.filters.length === 0) {
            primaryRecipient = (<SingleCheckboxType
                {...this.props}
                code={this.props.value}
                name={this.props.name}
                key={`${this.props.id} - ${this.props.value}`}
                id={`${this.props.id} - ${this.props.value}`} />);
        }

        return (
            <li className="checkbox-set">
                <div className="primary-checkbox">
                    {primaryRecipient}
                </div>
                <ul className="secondary-checkbox-set">
                    {secondaryRecipientTypes}
                </ul>
            </li>
        );
    }
}

PrimaryCheckboxType.propTypes = propTypes;
PrimaryCheckboxType.defaultProps = defaultProps;
