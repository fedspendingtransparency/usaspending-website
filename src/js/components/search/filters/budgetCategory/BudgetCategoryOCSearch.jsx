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
            id: 'personnel_compensation_and_benefits',
            name: 'Personnel compensation and benefits',
            filters: objectClassDefinitionsGroups.personnel_compensation_and_benefits
        },
        {
            id: 'contractual_services_and_supplies',
            name: 'Contractual services and supplies',
            filters: objectClassDefinitionsGroups.contractual_services_and_supplies
        },
        {
            id: 'acquisition_of_assets',
            name: 'Acquisition of assets',
            filters: objectClassDefinitionsGroups.acquisition_of_assets
        },
        {
            id: 'grants_and_fixed_changes',
            name: 'Grants and fixed charges',
            filters: objectClassDefinitionsGroups.grants_and_fixed_changes
        },
        {
            id: 'other',
            name: 'Other',
            filters: objectClassDefinitionsGroups.other
        }
    ]
};

const propTypes = {
    objectClassMapping: React.PropTypes.arrayOf(React.PropTypes.object),
    objectClasses: React.PropTypes.object
};

export default class BudgetCategoryOCSearch extends React.Component {
    render() {
        const objectClassItems = (
            this.props.objectClassMapping.map((type, index) =>
                <PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={objectClassDefinitions}
                    filterType="Object Class"
                    selectedCheckboxes={this.props.objectClasses}
                    enableAnalytics />
            ));

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
