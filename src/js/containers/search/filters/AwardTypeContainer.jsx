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
    bulkAwardTypeChange: PropTypes.func,
    awardType: PropTypes.object
};

const AwardTypeContainer = ({
    toggleAwardType, bulkAwardTypeChange, awardType
}) => {
    const toggleAwardTypeFunc = (selection) => {
        toggleAwardType(selection);
    };

    const bulkAwardTypeChangeFunc = (selection) => {
        bulkAwardTypeChange(selection);
    };


    return (
        <AwardType
            awardType={awardType}
            toggleCheckboxType={toggleAwardTypeFunc}
            bulkTypeChange={bulkAwardTypeChangeFunc} />
    );
};

AwardTypeContainer.propTypes = propTypes;
export default connect(
    (state) => ({
        awardType: state.filters.awardType
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(AwardTypeContainer);
