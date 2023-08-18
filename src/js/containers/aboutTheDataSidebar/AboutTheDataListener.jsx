/**
 * AboutTheDataListener.jsx
 * Created by Andrea Blackwell 12/06/2022
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { omit } from 'lodash';

import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { useQueryParams, getQueryParamString } from 'helpers/queryParams';

const AboutTheDataListener = ({
    history,
    aboutTheDataSidebar,
    match,
    location,
    showAboutTheData,
    setAboutTheDataTermFromUrl,
    Child
}) => {
    const { pathname, search } = useLocation();
    const queryParams = useQueryParams();

    // this is not currently being used to open the atd slideout;
    // for now it is being opened from special functions in DropdownItem,
    // MobileDropdownItem, and HomepageResources;
    // We aren't using this listener for ATD because it was causing
    // the page to reload when opening the slideout;
    // todo - figure out why this listener is causing a page reload when the GlossaryListener does not
    useEffect(() => {
        if (search.includes('about-the-data')) {
            const { "about-the-data": term } = queryParams;
            showAboutTheData();
            setAboutTheDataTermFromUrl(term);
            history.replace({
                pathname,
                search: getQueryParamString(omit(queryParams, ['about-the-data']))
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, aboutTheDataSidebar.display, history.location.search, setAboutTheDataTermFromUrl]);
    return <Child {...{ history, match, location }} />;
};

AboutTheDataListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    aboutTheDataSidebar: PropTypes.object,
    showAboutTheData: PropTypes.func,
    setAboutTheDataTermFromUrl: PropTypes.func,
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node])
};

const AboutTheDataListenerContainer = connect(
    (state) => ({
        aboutTheDataSidebar: state.aboutTheDataSidebar
    }),
    (dispatch) => ({
        showAboutTheData: () => dispatch(aboutTheDataActions.showAboutTheData()),
        setAboutTheDataTermFromUrl: (term) => dispatch(aboutTheDataActions.setAboutTheDataTermFromUrl(term))
    })
)(AboutTheDataListener);

export default AboutTheDataListenerContainer;
