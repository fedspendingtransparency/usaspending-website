/**
 * AboutTheDataListener.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import * as slideoutActions from 'redux/actions/slideouts/slideoutActions';
import { useQueryParams } from 'helpers/queryParams';

const AboutTheDataListener = ({
    history,
    match,
    location,
    showAboutTheData,
    setAboutTheDataTermFromUrl,
    Child,
    setLastOpenedSlideout
}) => {
    const { search } = useLocation();
    const queryParams = useQueryParams();

    useEffect(() => {
        if (search.includes('about-the-data')) {
            const { "about-the-data": term } = queryParams;
            showAboutTheData();
            setAboutTheDataTermFromUrl(term);
            setLastOpenedSlideout('atd');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.search]);

    return <Child {...{ history, match, location }} />;
};

AboutTheDataListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    showAboutTheData: PropTypes.func,
    setAboutTheDataTermFromUrl: PropTypes.func,
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node]),
    setLastOpenedSlideout: PropTypes.func
};

const AboutTheDataListenerContainer = connect(
    (state) => ({
        aboutTheDataSidebar: state.aboutTheDataSidebar
    }),
    (dispatch) => ({
        showAboutTheData: () => dispatch(aboutTheDataActions.showAboutTheData()),
        setAboutTheDataTermFromUrl: (term) => dispatch(aboutTheDataActions.setAboutTheDataTermFromUrl(term)),
        setLastOpenedSlideout: (lastOpened) => dispatch(slideoutActions.setLastOpenedSlideout(lastOpened))
    })
)(AboutTheDataListener);

export default AboutTheDataListenerContainer;
