/**
 * AboutTheDataContainer.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import schema from 'dataMapping/aboutTheDataSchema';

import AnimatedAboutTheDataWrapper from 'components/aboutTheDataSidebar/AnimatedAboutTheDataWrapper';

import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { Entry } from 'redux/reducers/aboutTheDataSidebar/aboutTheDataReducer';

require('pages/glossary/glossaryPage.scss');

const propTypes = {
    aboutTheDataSidebar: PropTypes.object,
    setAboutTheDataResults: PropTypes.func,
    showAboutTheData: PropTypes.func,
    setAboutTheDataTerm: PropTypes.func,
    setTermFromUrl: PropTypes.func
};

export const AboutTheDataContainer = (props) => {
    useEffect(() => {
        console.log(props.aboutTheDataSidebar)
        props.showAboutTheData();
        // if (termFromUrl) {
        //     props.setAboutTheDataTerm(term);
        //     props.setTermFromUrl('');
        // }
    }, []);

    // const populateWithAllTerms = () => {
    //
    // };

    const performSearch = () => {
        return false;
    };

    const parseTerms = (data) => {
        const terms = data.map((result) => new Entry(result));
        props.setAboutTheDataResults(terms);
    };

    // jumpToTerm(slug) {
    //     // look for a matching slug
    //     if (this.props.aboutTheDataSchema.has(slug)) {
    //         // we found the term, load the word
    //         const result = this.props.aboutTheDataSchema.get(slug);
    //         this.props.setAboutTheDataTerm(result);
    //         // now force open the glossary
    //         this.props.showAboutTheData();
    //     }
    // }

    return (
        <AnimatedAboutTheDataWrapper
            {...props} />
    );
};

AboutTheDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        aboutTheDataSidebar: state.aboutTheDataSidebar
    }),
    (dispatch) => bindActionCreators(aboutTheDataActions, dispatch)
)(AboutTheDataContainer);
