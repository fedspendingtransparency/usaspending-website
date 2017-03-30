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
    updateObjectClasses: React.PropTypes.func
};

export class BudgetCategoryOCContainer extends React.Component {
    render() {
        return (
            <BudgetCategoryOCSearch
                {...this.props}
                selectObjectClass={this.props.updateObjectClasses.bind(this)} />
        );
    }
}

BudgetCategoryOCContainer.propTypes = propTypes;

export default connect(
    (state) => ({ objectClasses: state.filters.objectClasses }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(BudgetCategoryOCContainer);
