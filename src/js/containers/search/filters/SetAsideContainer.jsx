/**
 * SetAsideContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import ContractFilter from 'components/search/filters/contractFilters/ContractFilter';

const propTypes = {
    updateSetAside: React.PropTypes.func
};

export class SetAsideContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.selectSetAside = this.selectSetAside.bind(this);
    }

    selectSetAside(value) {
        this.props.updateSetAside(value);
    }

    render() {
        return (
            <ContractFilter
                {...this.props}
                contractFilterType="set_aside"
                contractFilterOptions="setAsideDefinitions"
                contractFilterState="setAside"
                toggleFilter={this.selectSetAside} />
        );
    }
}

SetAsideContainer.propTypes = propTypes;

export default connect(
    (state) => ({ setAside: state.filters.setAside }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(SetAsideContainer);
