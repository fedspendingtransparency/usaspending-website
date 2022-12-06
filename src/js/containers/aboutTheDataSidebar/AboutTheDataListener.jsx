import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { omit } from 'lodash';

import * as aboutTheDataActions from 'redux/actions/aboutTheDataSidebar/aboutTheDataActions';
import { useQueryParams, getQueryParamString } from 'helpers/queryParams';

const AboutTheDataListener = ({
    history,
    ATD,
    match,
    location,
    showATD,
    setATDTermFromUrl,
    Child
}) => {
    const { pathname, search } = useLocation();
    const queryParams = useQueryParams();

    useEffect(() => {
        // The #fscommand=fstest is used to access the Foresee survey admin panel
        if (!location.hash || location.hash.indexOf('#fscommand=fstest') > -1) {
            return;
        }

        const urlWithNoHash = location.hash.split("#").length > 1
            ? location.hash.split("#")[1]
            : '';
        history.replace(urlWithNoHash);
    }, [location, history]);

    useEffect(() => {
        if (search.includes('about-the-data')) {
            const { "about-the-data": term } = queryParams;
            showATD();
            setATDTermFromUrl(term);
            // history.replace({
            //     pathname,
            //     search: getQueryParamString(omit(queryParams, ['about-the-data']))
            // });
        }
    }, [history, history.location.search, setATDTermFromUrl, search, queryParams, pathname]);
    return <Child {...{ history, match, location }} />;
};

AboutTheDataListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    ATD: PropTypes.object,
    showATD: PropTypes.func,
    setATDTermFromUrl: PropTypes.func,
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node])
};

const AboutTheDataListenerContainer = connect(
    (state) => ({
        ATD: state.ATD
    }),
    (dispatch) => ({
        showATD: () => dispatch(aboutTheDataActions.showATD()),
        setATDTermFromUrl: (term) => dispatch(aboutTheDataActions.setATDTermFromUrl(term))
    })
)(AboutTheDataListener);


const withAboutTheDataListener = (component, props) => (
    <AboutTheDataListenerContainer {...props} Child={component} />
);

export default withAboutTheDataListener;
