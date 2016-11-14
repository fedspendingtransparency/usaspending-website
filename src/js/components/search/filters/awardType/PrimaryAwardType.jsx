/**
 * primaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';

import awardTypeCodes from 'dataMapping/search/awardType';

import SecondaryAwardType from './SecondaryAwardType';
import CollapsedAwardType from './CollapsedAwardType';
import SingleAwardType from './SingleAwardType';

const propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    filters: React.PropTypes.array,
    reduxFilters: React.PropTypes.object,
    bulkAwardTypeChange: React.PropTypes.func,
    value: React.PropTypes.string
};

const defaultProps = {
    id: '',
    name: '',
    filters: [],
    value: null
};

export default class PrimaryAwardType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSubItems: false,
            arrowState: 'collapsed',
            selectedChildren: false,
            allChildren: false
        };
    }

    componentDidMount() {
        this.compareFiltersToChildren();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reduxFilters.hashCode() !== this.props.reduxFilters.hashCode()) {
            this.compareFiltersToChildren();
        }
    }

    compareFiltersToChildren() {
        // check to see if the children are all selected or not
        let allSelected = true;

        for (const code of this.props.filters) {
            if (!this.props.reduxFilters.has(code)) {
                allSelected = false;
                break;
            }
        }

        this.setState({
            allChildren: allSelected
        });
    }

    toggleSubItems(e) {
        e.preventDefault();

        let newShowState = !this.state.showSubItems;
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

        if (this.state.allChildren) {
            // all the children are selected, deselect them
            this.props.bulkAwardTypeChange({
                awardTypes: this.props.filters,
                direction: 'remove'
            });
            // collapse the children
            showChildren = false;
        }
        else {
            // not all the children are selected, select them all
            this.props.bulkAwardTypeChange({
                awardTypes: this.props.filters,
                direction: 'add'
            });
        }

        this.setState({
            showSubItems: showChildren
        });
    }

    render() {
        let primaryAward = (<CollapsedAwardType
            id={this.props.id}
            name={this.props.name}
            code={this.props.value}
            selected={this.state.allChildren}
            arrowState={this.state.arrowState}
            toggleExpand={this.toggleSubItems.bind(this)}
            toggleChildren={this.toggleChildren.bind(this)}
            hideArrow={this.state.allChildren} />);

        let secondaryAwardTypes = null;

        if (this.state.showSubItems) {
            secondaryAwardTypes = this.props.filters.map((code) =>
                <SecondaryAwardType
                    {...this.props}
                    code={code}
                    name={awardTypeCodes[code]}
                    key={`${this.props.id} - ${code}`}
                    id={`${this.props.id} - ${code}`} />);
        }

        if (this.props.filters.length === 0) {
            primaryAward = (<SingleAwardType
                {...this.props}
                code={this.props.value}
                name={this.props.name}
                key={`${this.props.id} - ${this.props.value}`}
                id={`${this.props.id} - ${this.props.value}`} />);
        }

        return (
            <li className="award-set">
                <div className="primary-award">
                    {primaryAward}
                </div>
                <ul className="secondary-award-set">
                    {secondaryAwardTypes}
                </ul>
            </li>
        );
    }
}

PrimaryAwardType.propTypes = propTypes;
PrimaryAwardType.defaultProps = defaultProps;
