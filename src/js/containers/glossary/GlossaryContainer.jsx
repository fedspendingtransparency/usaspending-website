/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as GlossaryHelper from 'helpers/glossaryHelper';

import AnimatedGlossaryWrapper from 'components/glossary/AnimatedGlossaryWrapper';

import * as glossaryActions from 'redux/actions/glossary/glossaryActions';
import { Definition } from 'redux/reducers/glossary/glossaryReducer';

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
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState(false);
    let request = null;

    const parseTerms = (data) => {
        const terms = data.map((result) => new Definition(result));
        props.setGlossaryResults(terms);
    };

    const writeCache = (data) => {
        const terms = data.reduce((acc, searchResult) => Object.assign(acc, {
            [searchResult.slug]: new Definition(searchResult)
        }), {});

        props.setGlossaryCache(terms);
    };

    const populateGlossaryWithAllTerms = () => {
        setSearchLoading(true);

        if (request) {
            request.cancel();
        }

        request = GlossaryHelper.fetchAllTerms();
        request.promise
            .then((res) => {
                parseTerms(res.data.results);
                request = null;
                setLoading(false);
                setSearchLoading(false);
                setError(false);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setLoading(false);
                    setSearchLoading(false);
                    setError(true);
                }
                request = null;
            });
    };

    const performSearch = () => {
        const { input } = props.glossary.search;

        if (!input) {
            // if there is no search input, auto-populate glossary results w/ all terms
            populateGlossaryWithAllTerms();
            return;
        }

        if (request) {
            request.cancel();
        }

        request = GlossaryHelper.fetchSearchResults({
            search_text: input,
            limit: 500
        });

        setSearchLoading(true);

        request.promise
            .then((res) => {
                setLoading(false);
                setSearchLoading(false);
                setError(false);

                request = null;

                parseTerms(res.data.matched_terms);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setLoading(false);
                    setSearchLoading(false);
                    setError(true);
                }
                request = null;
            });
    };

    const populateCache = () => {
        if (request) {
            request.cancel();
        }

        setLoading(true);
        setSearchLoading(true);
        setError(false);

        request = GlossaryHelper.fetchAllTerms();

        request.promise
            .then((res) => {
                writeCache(res.data.results);
                request = null;
                // if there is no search input, autopopulate glossary results w/ all terms
                if (!props.glossary.search.input) {
                    parseTerms(res.data.results);
                    setLoading(false);
                    setSearchLoading(false);
                    setError(false);
                }
                else {
                    // okay now perform the search (which will be the same data most of the time,
                    // but potentially not)
                    performSearch();
                }
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setLoading(false);
                    setSearchLoading(false);
                    setError(true);
                }

                request = null;
            });
    };

    useEffect(() => {
        // on the first load, populate the cache
        if (props.glossary.cache.count() === 0) {
            // no cache set yet, populate it
            // we need to build a cache because
            // when the glossary is searched, it may internally link
            // terms that are no longer in the results array
            populateCache();
        }
        else {
            // we have a cache set, just do a search
            performSearch();
        }
        // return () => {
        //     if (request) {
        //         request.cancel();
        //     }
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { termFromUrl, cache } = props.glossary;

        if (cache.count() > 0 && termFromUrl) {
            const term = cache.get(termFromUrl);
            props.setGlossaryTerm(term);
            props.setTermFromUrl('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.glossary]);

    return (
        <AnimatedGlossaryWrapper
            {...props}
            loading={loading}
            error={error}
            searchLoading={searchLoading}
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
