/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    const [isError, setIsError] = useState(false);
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

    const { data, isSuccess, error } = useQuery({
        queryKey: ['glossaryData'],
        queryFn: () => fetch('https://api.usaspending.gov/api/v2/references/glossary/?limit=500').then((r) => r.json())
    });

    useEffect(() => {
        console.log("data", data, isSuccess);
        if (isSuccess && data) {
            writeCache(data.results);
            parseTerms(data.results);
            // Your side effect logic here
            console.log('Data fetched successfully:', data);
            // Example: show a toast notification
            // toast.success('User data loaded!');
        }

        if (error) {
            // Handle error side effects
            // toast.error('Failed to load user data!');
        }
    }, [isSuccess, data, error]); // Add error to the dependency array if you handle it here



    // const {data, isPending, er} = useQuery({
    //     queryKey: ['glossaryData'],
    //     queryFn: () => fetch('https://api.usaspending.gov/api/v2/references/glossary/?limit=500').then(r => r.json()),
    //     staleTime: 60000
    // });


    // const queryClient = useQueryClient();
    // const mutation = useMutation({
    //     mutationFn: () => fetch('https://api.usaspending.gov/api/v2/references/glossary/?limit=500').then(r => r.json()),
    //     onSuccess: () => {
    //         console.log("done");
    //         // Invalidate and refetch queries after a successful mutation
    //         // queryClient.invalidateQueries({ queryKey: ['todos'] });
    //     },
    //     onError: () => {
    //
    //     },
    //     onMutate: () => {
    //         console.log("mutate");
    //     }
    // });
    // ...


    // const populateGlossaryWithAllTerms = () => {
    //     setSearchLoading(true);
    //
    //     if (request) {
    //         request.cancel();
    //     }
    //
    //
    //     request = GlossaryHelper.fetchAllTerms();
    //     request.promise
    //         .then((res) => {
    //             parseTerms(res.data.results);
    //             request = null;
    //             setLoading(false);
    //             setSearchLoading(false);
    //             setError(false);
    //         })
    //         .catch((err) => {
    //             if (!isCancel(err)) {
    //                 console.log(err);
    //                 setLoading(false);
    //                 setSearchLoading(false);
    //                 setError(true);
    //             }
    //             request = null;
    //         });
    // };

    const performSearch = () => {
        const { input } = props.glossary.search;

        if (!input) {
            // if there is no search input, auto-populate glossary results w/ all terms
            // populateGlossaryWithAllTerms();
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
                setIsError(false);

                request = null;

                parseTerms(res.data.matched_terms);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    setLoading(false);
                    setSearchLoading(false);
                    setIsError(true);
                }
                request = null;
            });
    };

    // const populateCache = () => {
    //     if (request) {
    //         request.cancel();
    //     }
    //
    //     setLoading(true);
    //     setSearchLoading(true);
    //     setError(false);
    //
    //     request = GlossaryHelper.fetchAllTerms();
    //
    //     request.promise
    //         .then((res) => {
    //             writeCache(res.data.results);
    //             request = null;
    //             // if there is no search input, autopopulate glossary results w/ all terms
    //             if (!props.glossary.search.input) {
    //                 parseTerms(res.data.results);
    //                 setLoading(false);
    //                 setSearchLoading(false);
    //                 setError(false);
    //             }
    //             else {
    //                 // okay now perform the search (which will be the same data most of the time,
    //                 // but potentially not)
    //                 performSearch();
    //             }
    //         })
    //         .catch((err) => {
    //             if (!isCancel(err)) {
    //                 console.log(err);
    //                 setLoading(false);
    //                 setSearchLoading(false);
    //                 setError(true);
    //             }
    //
    //             request = null;
    //         });
    // };

    useEffect(() => {
        // on the first load, populate the cache
        if (props.glossary?.cache.count() === 0) {
            // no cache set yet, populate it
            // we need to build a cache because
            // when the glossary is searched, it may internally link
            // terms that are no longer in the results array
            // populateCache();
        }
        else {
            // we have a cache set, just do a search
            // performSearch();
        }
        // return () => {
        //     if (request) {
        //         request.cancel();
        //     }
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // const { termFromUrl, cache } = props.glossary;
        // const { cache } = props.glossary;
        console.log(props);

        // if (cache.count() > 0 && termFromUrl) {
        //     const term = cache.get(termFromUrl);
        //     props.setGlossaryTerm(term);
        //     props.setTermFromUrl('');
        // }
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
