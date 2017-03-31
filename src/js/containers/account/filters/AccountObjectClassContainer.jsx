/**
 * AccountObjectClassContainer.jsx
 * Created by Kevin Li 3/30/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import ObjectClassFilter from 'components/account/filters/objectClass/ObjectClassFilter';

const propTypes = {
    selectedCodes: React.PropTypes.array
};

export class AccountObjectClassContainer extends React.Component {
    constructor(props) {
        super(props);
        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
    }

    updateFilter(code) {
        
    }

    render() {
        return (
            <ObjectClassFilter
                {...this.props}
                updateFilter={this.updateFilter} />
        );
    }
}

AccountObjectClassContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedCodes: state.account.filters.objectClass
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountObjectClassContainer);
