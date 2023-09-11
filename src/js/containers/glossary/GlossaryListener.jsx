import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as glossaryActions from 'redux/actions/glossary/glossaryActions';
import * as slideoutActions from 'redux/actions/slideouts/slideoutActions';
import { useQueryParams } from 'helpers/queryParams';

const GlossaryListener = ({
    history,
    match,
    location,
    showGlossary,
    setTermFromUrl,
    Child,
    setLastOpenedSlideout
}) => {
    const { search } = useLocation();
    const queryParams = useQueryParams();

    useEffect(() => {
        if (search.includes('glossary')) {
            const { glossary: term } = queryParams;
            showGlossary();
            setTermFromUrl(term);
            setLastOpenedSlideout('glossary');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.search]);

    return <Child {...{ history, match, location }} />;
};

GlossaryListener.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    glossary: PropTypes.object,
    showGlossary: PropTypes.func,
    setTermFromUrl: PropTypes.func,
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node]),
    setLastOpenedSlideout: PropTypes.func
};

const GlossaryListenerContainer = connect(
    (state) => ({
        glossary: state.glossary
    }),
    (dispatch) => ({
        showGlossary: () => dispatch(glossaryActions.showGlossary()),
        setTermFromUrl: (term) => dispatch(glossaryActions.setTermFromUrl(term)),
        setLastOpenedSlideout: (lastOpened) => dispatch(slideoutActions.setLastOpenedSlideout(lastOpened))
    })
)(GlossaryListener);

export default GlossaryListenerContainer;
