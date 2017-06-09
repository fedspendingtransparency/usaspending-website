/**
 * BudgetCategoryOCSearch.jsx
 * Created by michaelbray on 3/20/17.
 */

import React from 'react';
import { objectClassDefinitions, objectClassDefinitionsGroups }
from 'dataMapping/search/budgetCategory';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const defaultProps = {
    objectClassMapping: [
        {
            id: '10',
            name: 'Personnel compensation and benefits',
            filters: objectClassDefinitionsGroups.personnel_compensation_and_benefits
        },
        {
            id: '20',
            name: 'Contractual services and supplies',
            filters: objectClassDefinitionsGroups.contractual_services_and_supplies
        },
        {
            id: '30',
            name: 'Acquisition of assets',
            filters: objectClassDefinitionsGroups.acquisition_of_assets
        },
        {
            id: '40',
            name: 'Grants and fixed charges',
            filters: objectClassDefinitionsGroups.grants_and_fixed_changes
        },
        {
            id: '90',
            name: 'Other',
            filters: objectClassDefinitionsGroups.other
        }
    ]
};

const propTypes = {
    objectClassMapping: React.PropTypes.arrayOf(React.PropTypes.object),
    selectObjectClass: React.PropTypes.func,
    objectClasses: React.PropTypes.object,
    bulkTypeChange: React.PropTypes.func
};

export default class BudgetCategoryOCSearch extends React.Component {
    render() {
        const objectClassItems = [];

        this.props.objectClassMapping.forEach((type, index) => {
            objectClassItems.push(<PrimaryCheckboxType
                {...type}
                {...this.props}
                key={index}
                types={objectClassDefinitions}
                filterType="Object Class"
                selectedCheckboxes={this.props.objectClasses}
                toggleCheckboxType={this.props.selectObjectClass.bind(this)}
                bulkTypeChange={this.props.bulkTypeChange}
                enableAnalytics />);
        });

        return (
            <div className="pop-typeahead checkbox-type-filter ">
                <p className="object-class-label">Object Class</p>
                <ul className="object-classes checkbox-types">
                    {objectClassItems}
                </ul>
            </div>
        );
    }
}

BudgetCategoryOCSearch.propTypes = propTypes;
BudgetCategoryOCSearch.defaultProps = defaultProps;
