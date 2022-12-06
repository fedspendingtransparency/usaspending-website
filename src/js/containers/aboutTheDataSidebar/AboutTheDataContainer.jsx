/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import schema from 'dataMapping/aboutTheDataSchema';
import AnimatedAboutTheDataWrapper from 'components/aboutTheDataSidebar/AnimatedAboutTheDataWrapper';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';

require('components/aboutTheDataSidebar/aboutTheData.scss');

const propTypes = {
    aboutTheDataSidebar: PropTypes.object,
    setAboutTheDataResults: PropTypes.func,
    showAboutTheData: PropTypes.func,
    setAboutTheDataTerm: PropTypes.func,
    setTermFromUrl: PropTypes.func
};

export const AboutTheDataContainer = (props) => {
    return (
        <AnimatedAboutTheDataWrapper
            {...props}
            schema={schema} />
    );
};

AboutTheDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        aboutTheDataSidebar: state.aboutTheDataSidebar
    }),
    (dispatch) => bindActionCreators(aboutTheDataActions, dispatch)
)(AboutTheDataContainer);
