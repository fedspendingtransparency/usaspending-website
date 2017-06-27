/**
 * ContractFilters.jsx
 * Created by Emily Gullo on 6/23/2017
 */

import React from 'react';
import * as ContractFieldDefinitions from 'dataMapping/search/contractFields';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const propTypes = {
    toggleFilter: React.PropTypes.func,
    contractFilterType: React.PropTypes.string,
    contractFilterOptions: React.PropTypes.string,
    contractFilterState: React.PropTypes.string
};

export default class ContractFilter extends React.Component {

    constructor(props) {
        super(props);

        // Bind functions
        this.toggleValue = this.toggleValue.bind(this);
    }

    toggleValue(value) {
        this.props.toggleFilter(value);
    }

    render() {
        const contractFilterItems = [];
        Object.keys(ContractFieldDefinitions[this.props.contractFilterOptions]).forEach((key) => {
            const label = ContractFieldDefinitions[this.props.contractFilterOptions][key];
            contractFilterItems.push(
                <PrimaryCheckboxType
                    {...this.props}
                    key={key}
                    id={`${this.props.contractFilterOptions}-${key}`}
                    name={label}
                    value={key}
                    types={ContractFieldDefinitions[this.props.contractFilterOptions]}
                    code={key}
                    filterType={this.props.contractFilterType}
                    selectedCheckboxes={this.props[this.props.contractFilterState]}
                    toggleCheckboxType={this.toggleValue}
                    enableAnalytics />);
        });

        return (
            <div
                className={`contract-filter search-filter checkbox-type-filter
                    ${this.props.contractFilterType}`}>
                <p className="sub-head">
                    {ContractFieldDefinitions.groupLabels[this.props.contractFilterType]}
                </p>
                <div className="filter-item-wrap">
                    <ul className="contract-types checkbox-types">
                        {contractFilterItems}
                    </ul>
                </div>
            </div>
        );
    }
}

ContractFilter.propTypes = propTypes;
