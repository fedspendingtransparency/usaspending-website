/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
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
    setAboutTheDataTermFromUrl: PropTypes.func
};

export const AboutTheDataContainer = (props) => {
    useEffect(() => {
        const { termFromUrl } = props.aboutTheDataSidebar;
        if (termFromUrl) {
            // find the term in the schema
            for (let i = 0; i < Object.keys(schema).length; i++) {
                const sectionName = Object.keys(schema)[i];
                for (let j = 0; j < schema[sectionName].fields.length; j++) {
                    if (schema[sectionName].fields[j].slug === termFromUrl) {
                        props.setAboutTheDataTerm(schema[sectionName].fields[j]);
                        props.setAboutTheDataTermFromUrl('');
                        break;
                    }
                }
            }
        }
    });

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
