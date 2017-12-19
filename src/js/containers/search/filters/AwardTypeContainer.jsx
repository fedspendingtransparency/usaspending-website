/**
  * AwardTypeContainer.jsx
  * Created by Kevin Li 11/1/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AwardType from 'components/search/filters/awardType/AwardType';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {
    toggleAwardType: PropTypes.func,
    bulkAwardTypeChange: PropTypes.func
};

export class AwardTypeContainer extends React.Component {
    constructor(props) {
        super(props);

        // Bind functions
        this.toggleAwardType = this.toggleAwardType.bind(this);
        this.bulkAwardTypeChange = this.bulkAwardTypeChange.bind(this);
    }

    toggleAwardType(selection) {
        this.props.toggleAwardType(selection);
    }

    bulkAwardTypeChange(selection) {
        this.props.bulkAwardTypeChange(selection);
    }

    render() {
        return (
            <AwardType
                {...this.props}
                toggleCheckboxType={this.toggleAwardType}
                bulkTypeChange={this.bulkAwardTypeChange} />
        );
    }
}

AwardTypeContainer.propTypes = propTypes;

export default connect(
    (state) => ({ awardType: state.filters.awardType }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainer);
