import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as glossaryActions from 'redux/actions/glossary/glossaryActions';

const GlossaryListener = ({
    history,
    glossary,
    match,
    location,
    showGlossary,
    setTermFromUrl,
    Child
}) => {
    useEffect(() => {
        if (location.hash) {
            const urlWithNoHash = location.hash.split("#").length > 1
                ? location.hash.split("#!")[1]
                : '';
            history.replace(urlWithNoHash);
        }
    }, [location, history]);
    useEffect(() => {
        if (history.location.search.includes('glossary')) {
            const termStr = history.location.search.split('glossary=')[1];
            showGlossary();
            setTermFromUrl(termStr);
            history.replace(history.location.path);
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


const withGlossaryListener = (component, props) => (
    <GlossaryListenerContainer {...props} Child={component} />
);

export default withGlossaryListener;
