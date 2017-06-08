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
            filters: objectClassDefinitionsGroups['10']
        },
        {
            id: '20',
            name: 'Contractual services and supplies',
            filters: objectClassDefinitionsGroups['20']
        },
        {
            id: '30',
            name: 'Acquisition of assets',
            filters: objectClassDefinitionsGroups['30']
        },
        {
            id: '40',
            name: 'Grants and fixed charges',
            filters: objectClassDefinitionsGroups['40']
        },
        {
            id: '90',
            name: 'Other',
            filters: objectClassDefinitionsGroups['90']
        }
    ]
};

const propTypes = {
    objectClassMapping: React.PropTypes.arrayOf(React.PropTypes.object),
    selectObjectClass: React.PropTypes.func,
    objectClasses: React.PropTypes.object
};

export default class BudgetCategoryOCSearch extends React.Component {
    render() {
        const objectClassItems = (
            this.props.objectClassMapping.forEach((type, index) =>
                <PrimaryCheckboxType
                    {...type}
                    {...this.props}
                    key={index}
                    types={objectClassDefinitions}
                    filterType="Object Class"
                    selectedCheckboxes={this.props.objectClasses}
                    toggleCheckboxType={this.props.selectObjectClass.bind(this)}
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
