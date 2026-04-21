/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import AnimatedGlossaryWrapper from 'components/glossary/AnimatedGlossaryWrapper';
import useFetchAllTerms from './useFetchAllTerms';
import * as glossaryActions from 'redux/actions/glossary/glossaryActions';

require('pages/glossary/glossaryPage.scss');

const propTypes = {
    glossary: PropTypes.object,
    setGlossaryResults: PropTypes.func,
    showGlossary: PropTypes.func,
    setGlossaryTerm: PropTypes.func,
    setGlossaryCache: PropTypes.func,
    setTermFromUrl: PropTypes.func
};

const GlossaryContainer = () => {
    const [loading, setLoading] = useState(true);
    const [terms, setTerms] = useState();

    // this is necessary, why?
    const glossary = useSelector((state) => state.glossary);
    // const dispatch = useDispatch();
    // dispatch(glossaryActions.setGlossaryTerm());
    // dispatch(glossaryActions.closeGlossary());

    const {
        allTerms, isSuccess, error
    } = useFetchAllTerms();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const performSearch = useCallback((input) => {
        if (!input) {
            setTerms(allTerms);
        } else {
            const filteredTerms = allTerms?.filter((item) => {
                const term = item.term.toLowerCase();
                return input.toLowerCase().split(" ").every((termName) => term.includes(termName));
            });
            setTerms(filteredTerms);
        }

        setLoading(false);
    });

    useEffect(() => {
        if (allTerms && isSuccess) {
            setTerms(allTerms);
            setLoading(false);
        }
    }, [allTerms, isSuccess]);

    return (
        <AnimatedGlossaryWrapper
            glossary={glossary}
            glossaryResults={terms}
            loading={loading}
            error={error}
            performSearch={performSearch} />
    );
};

GlossaryContainer.propTypes = propTypes;

export default GlossaryContainer;
