/**
 * ContractFilter.jsx
 * Created by Emily Gullo on 6/23/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { keys, invert } from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';
import * as ContractFieldDefinitions from 'dataMapping/search/contractFields';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

const propTypes = {
    toggleFilter: PropTypes.func,
    contractFilterType: PropTypes.string,
    contractFilterOptions: PropTypes.string,
    contractFilterState: PropTypes.string,
    dirtyFilters: PropTypes.symbol
};

const defaultShown = 5;

const defaultState = {
    shown: defaultShown,
    shownType: 'more'
};

export default class ContractFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;

        // Bind functions
        this.toggleValue = this.toggleValue.bind(this);
        this.toggleShownAmount = this.toggleShownAmount.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    toggleShownAmount() {
        const contractFilters = ContractFieldDefinitions[this.props.contractFilterOptions];

        let updatedState = defaultState;

        if (this.state.shownType === 'more') {
            updatedState = {
                shown: Object.keys(contractFilters).length,
                shownType: 'fewer'
            };
        }

        this.setState(updatedState);
    }

    toggleValue(value) {
        this.props.toggleFilter(value);
    }

    generateContractFilters(filters) {
        const contractFilters = [];
        // Creating vars for original filter and inverted filter keys
        const invertedFilters = invert(filters);
        const invertedKeys = keys(invertedFilters);

        if (contractFilters.length < this.state.shown) {
            // looping on inverted filters
            invertedKeys.sort().forEach((key) => {
                // need access to originalFilter[key] here but is undefined
                if (contractFilters.length < this.state.shown
                    && (key.name !== null && key.name !== '')) {
                    contractFilters.push(
                        <PrimaryCheckboxType
                            {...this.props}
                            key={key}
                            id={`${this.props.contractFilterOptions}-${key}`}
                            name={key}
                            value={invertedFilters[key]}
                            types={ContractFieldDefinitions[this.props.contractFilterOptions]}
                            code={invertedFilters[key]}
                            filterType={this.props.contractFilterType}
                            selectedCheckboxes={this.props[this.props.contractFilterState]}
                            toggleCheckboxType={this.toggleValue} />);
                }
            });
        }

        return contractFilters;
    }

    generateToggleButton() {
        const contractFilters = ContractFieldDefinitions[this.props.contractFilterOptions];
        let toggleButton = null;

        if (contractFilters && Object.keys(contractFilters).length > 5) {
            const remaining = Object.keys(contractFilters).length - this.state.shown;
            let shownStatement = `${remaining} ${this.state.shownType}`;
            let arrow = (<Icons.AngleDown alt={`See ${shownStatement}`} />);

            if (remaining === 0) {
                shownStatement = this.state.shownType;
                arrow = (<Icons.AngleUp alt={`See ${shownStatement}`} />);
            }

            toggleButton = (
                <button
                    className="see-more contract-filter-toggle-button"
                    onClick={this.toggleShownAmount}
                    title={`See ${shownStatement}`}
                    aria-label={`See ${shownStatement}`}
                    aria-expanded={this.state.shownType !== 'more'}>
                    See {shownStatement}
                    &nbsp; {arrow}
                </button>
            );
        }

        return toggleButton;
    }

    render() {
        const contractFilterItems =
        this.generateContractFilters(ContractFieldDefinitions[this.props.contractFilterOptions]);
        const toggleButton = this.generateToggleButton();

        return (
            <div
                className={`contract-filter search-filter checkbox-type-filter
                    ${this.props.contractFilterType}`}>
                <div className="filter-item-wrap">
                    <ul className="contract-types checkbox-types">
                        {contractFilterItems}
                    </ul>
                    {toggleButton}
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}

ContractFilter.propTypes = propTypes;
