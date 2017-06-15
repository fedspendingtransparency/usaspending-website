/**
 * BudgetCategoryOCContainer.jsx
 * Created by michaelbray on 3/20/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import BudgetCategoryOCSearch from
    'components/search/filters/budgetCategory/BudgetCategoryOCSearch';

const propTypes = {
    updateObjectClasses: React.PropTypes.func,
    bulkObjectClassesChange: React.PropTypes.func
};

export class BudgetCategoryOCContainer extends React.Component {

    constructor(props) {
        super(props);

        this.selectedObjectClass = this.props.updateObjectClasses.bind(this);
        this.bulkTypeChange = this.props.bulkObjectClassesChange.bind(this);
    }

    render() {
        return (
            <BudgetCategoryOCSearch
                {...this.props}
                selectObjectClass={this.selectedObjectClass}
                bulkTypeChange={this.bulkTypeChange} />
        );
    }
}

BudgetCategoryOCContainer.propTypes = propTypes;

export default connect(
    (state) => ({ objectClasses: state.filters.objectClasses }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(BudgetCategoryOCContainer);
