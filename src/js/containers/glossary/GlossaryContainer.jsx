/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AnimatedGlossaryWrapper from '../../components/glossary/AnimatedGlossaryWrapper';
import { Definition } from '../../redux/reducers/glossary/glossaryReducer';
import { setGlossaryCache, setGlossaryTerm, setTermFromUrl } from "../../redux/actions/glossary/glossaryActions";
import useFetchAllTerms from './useFetchAllTerms';

require('../../../_scss/pages/glossary/glossaryPage.scss');

const GlossaryContainer = () => {
    const [loading, setLoading] = useState(true);
    const [terms, setTerms] = useState();

    // This state is for glossary actions not results
    const glossary = useSelector((state) => state.glossary);

    const dispatch = useDispatch();

    const {
        allTerms, isSuccess, isLoading, error
    } = useFetchAllTerms();

    const writeCache = (data) => {
        const termsToCache = data.reduce((acc, searchResult) => Object.assign(acc, {
            [searchResult.slug]: new Definition(searchResult)
        }), {});

        dispatch(setGlossaryCache(termsToCache));
    };

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
        const { termFromUrl, cache } = glossary;

        if (cache.count() > 0 && termFromUrl) {
            const term = cache.get(termFromUrl);
            dispatch(setGlossaryTerm(term));
            dispatch(setTermFromUrl(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [glossary]);

    useEffect(() => {
        if (allTerms && isSuccess) {
            setTerms(allTerms);
            setLoading(false);

            if (glossary.cache.count() === 0) {
                writeCache(allTerms);
            }
        }
    }, [allTerms, isSuccess]);

    return (
        <AnimatedGlossaryWrapper
            glossary={glossary}
            glossaryResults={terms}
            loading={loading}
            error={error}
            searchLoading={isLoading}
            performSearch={performSearch} />
    );
};

export default GlossaryContainer;
