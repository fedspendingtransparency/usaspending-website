/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useQuery } from "@tanstack/react-query";

import * as GlossaryHelper from 'helpers/glossaryHelper';

import AnimatedGlossaryWrapper from 'components/glossary/AnimatedGlossaryWrapper';

import * as glossaryActions from 'redux/actions/glossary/glossaryActions';
import { Definition } from 'redux/reducers/glossary/glossaryReducer';
import useFetchAllTerms from './useFetchAllTerms';

require('pages/glossary/glossaryPage.scss');

const propTypes = {
    glossary: PropTypes.object,
    setGlossaryResults: PropTypes.func,
    showGlossary: PropTypes.func,
    setGlossaryTerm: PropTypes.func,
    setGlossaryCache: PropTypes.func,
    setTermFromUrl: PropTypes.func
};

const GlossaryContainer = (props) => {
    const [loading, setLoading] = useState(true);
    const [terms, setTerms] = useState();

    const {
        allTerms, isSuccess, isLoading, error
    } = useFetchAllTerms();

    // const {
    //     data: searchResults, isSuccess: searchResultsSuccess, isLoading: searchResultsLoading, error: searchResultsError
    // } = useQuery({
    //     queryKey: ['glossarySearchResults', input],
    //     queryFn: () => GlossaryHelper.fetchSearchResults({
    //         search_text: input,
    //         limit: 50
    //     }).promise,
    //     enabled: input !== '' && !!input,
    //     staleTime: 60000
    // });

    // const parseTerms = useCallback((data) => {
    //     const localTerms = data.map((result) => new Definition(result));
    //     setTerms(localTerms);
    //     props.setGlossaryResults(terms);
    // });

    // const writeCache = (data) => {
    //     const terms = data.reduce((acc, searchResult) => Object.assign(acc, {
    //         [searchResult.slug]: new Definition(searchResult)
    //     }), {});
    //
    //     props.setGlossaryCache(terms);
    // };

    // const populateGlossaryWithAllTerms = () => {
    //     parseTerms(allTerms.data.results);
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const performSearch = useCallback((input) => {
        if (!input) {
            setTerms(allTerms);
        } else {
            // add js to perform a search
        }

        setLoading(false);
    });

    useEffect(() => {
        if (allTerms && isSuccess) {
            setTerms(allTerms);
            setLoading(false);
        }
    }, [allTerms, isSuccess]);

    // useEffect(() => {
    //     if (props.glossary.cache.count() === 0) {
    //         if (allTerms && allTermsSuccess) {
    //             writeCache(allTerms.data.results);
    //
    //             if (!input) {
    //                 parseTerms(allTerms.data.results);
    //                 setLoading(false);
    //             }
    //             else {
    //                 performSearch();
    //             }
    //         }
    //     }
    //     else {
    //         performSearch();
    //     }
    //
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [allTerms, allTermsSuccess, input]);

    // useEffect(() => {
    //     const { termFromUrl, cache } = props.glossary;
    //
    //     if (cache.count() > 0 && termFromUrl) {
    //         const term = cache.get(termFromUrl);
    //         props.setGlossaryTerm(term);
    //         props.setTermFromUrl('');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [props?.glossary]);

    return (
        <AnimatedGlossaryWrapper
            {...props}
            glossaryResults={terms}
            loading={loading}
            error={error}
            performSearch={performSearch} />
    );
};

GlossaryContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        glossary: state.glossary
    }),
    (dispatch) => bindActionCreators(glossaryActions, dispatch)
)(GlossaryContainer);
