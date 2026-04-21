/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import AnimatedGlossaryWrapper from 'components/glossary/AnimatedGlossaryWrapper';
import useFetchAllTerms from './useFetchAllTerms';

require('pages/glossary/glossaryPage.scss');

const GlossaryContainer = () => {
    const [loading, setLoading] = useState(true);
    const [terms, setTerms] = useState();

    // Glossary TODO this is necessary, why?
    const glossary = useSelector((state) => state.glossary);

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

export default GlossaryContainer;
