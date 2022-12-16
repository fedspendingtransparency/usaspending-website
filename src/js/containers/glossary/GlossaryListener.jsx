import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { omit } from 'lodash';

import * as glossaryActions from 'redux/actions/glossary/glossaryActions';
import { useQueryParams, getQueryParamString } from 'helpers/queryParams';

const GlossaryListener = ({
    history,
    glossary,
    match,
    location,
    showGlossary,
    setTermFromUrl,
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
        if (search.includes('glossary')) {
            const { glossary: term } = queryParams;
            showGlossary();
            setTermFromUrl(term);
            history.replace({
                pathname,
                search: getQueryParamString(omit(queryParams, ['glossary']))
            });
        }
    }, [history, glossary.display, history.location.search, setTermFromUrl, showGlossary]);
    return <Child {...{ history, match, location }} />;
};

GlossaryListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    glossary: PropTypes.object,
    showGlossary: PropTypes.func,
    setTermFromUrl: PropTypes.func,
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node])
};

const GlossaryListenerContainer = connect(
    (state) => ({
        glossary: state.glossary
    }),
    (dispatch) => ({
        showGlossary: () => dispatch(glossaryActions.showGlossary()),
        setTermFromUrl: (term) => dispatch(glossaryActions.setTermFromUrl(term))
    })
)(GlossaryListener);

export default GlossaryListenerContainer;
