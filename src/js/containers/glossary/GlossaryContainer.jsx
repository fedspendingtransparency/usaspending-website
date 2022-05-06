/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
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

export class GlossaryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            searchLoading: false,
            error: false
        };

        this.request = null;

        this.performSearch = this.performSearch.bind(this);
        this.populateGlossaryWithAllTerms = this.populateGlossaryWithAllTerms.bind(this);
    }

    componentDidMount() {
    // on the first load, populate the cache
        if (this.props.glossary.cache.count() === 0) {
            // no cache set yet, populate it
            // we need to build a cache because when the glossary is searched, it may internally link
            // terms that are no longer in the results array
            this.populateCache();
        }
        else {
            // we have a cache set, just do a search
            this.performSearch();
        }
    }

    componentDidUpdate() {
        const { termFromUrl, cache } = this.props.glossary;
        if (cache.count() > 0 && termFromUrl) {
            const term = cache.get(termFromUrl);
            this.props.setGlossaryTerm(term);
            this.props.setTermFromUrl('');
        }
    }

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
        }
    }

    populateCache() {
        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            loading: true,
            searchLoading: true,
            error: false
        });

        this.request = GlossaryHelper.fetchAllTerms();

        this.request.promise
            .then((res) => {
                this.writeCache(res.data.results);
                this.request = null;
                // if there is no search input, auto-populate glossary results w/ all terms
                if (!this.props.glossary.search.input) {
                    this.parseTerms(res.data.results);
                    this.setState({
                        loading: false,
                        searchLoading: false,
                        error: false
                    });
                }
                else {
                    // okay now perform the search (which will be the same data most of the time,
                    // but potentially not)
                    this.performSearch();
                }
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.setState({
                        loading: false,
                        searchLoading: false,
                        error: true
                    });
                }

                this.request = null;
            });
    }

    populateGlossaryWithAllTerms() {
        this.setState({
            searchLoading: true
        });

        if (this.request) {
            this.request.cancel();
        }

        this.request = GlossaryHelper.fetchAllTerms();
        this.request.promise
            .then((res) => {
                this.parseTerms(res.data.results);
                this.request = null;
                this.setState({
                    loading: false,
                    searchLoading: false,
                    error: false
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.setState({
                        loading: false,
                        searchLoading: false,
                        error: true
                    });
                }
                this.request = null;
            });
    }

    performSearch() {
        const { input } = this.props.glossary.search;

        if (!input) {
            // if there is no search input, auto-populate glossary results w/ all terms
            this.populateGlossaryWithAllTerms();
            return;
        }

        if (this.request) {
            this.request.cancel();
        }

        this.request = GlossaryHelper.fetchSearchResults({
            search_text: input,
            limit: 500
        });

        this.setState({
            searchLoading: true
        });

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false,
                    searchLoading: false,
                    error: false
                });

                this.request = null;

                this.parseTerms(res.data.matched_terms);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.setState({
                        loading: false,
                        searchLoading: false,
                        error: true
                    });
                }
                this.request = null;
            });
    }

    parseTerms(data) {
        const terms = data.map((result) => new Definition(result));
        this.props.setGlossaryResults(terms);
    }

    writeCache(data) {
        const terms = data.reduce((acc, searchResult) => Object.assign(acc, {
            [searchResult.slug]: new Definition(searchResult)
        }), {});

        this.props.setGlossaryCache(terms);
    }

    jumpToTerm(slug) {
    // look for a matching slug
        if (this.props.glossary.cache.has(slug)) {
            // we found the term, load the word
            const result = this.props.glossary.cache.get(slug);
            this.props.setGlossaryTerm(result);
            // now force open the glossary
            this.props.showGlossary();
        }
    }

    render() {
        return (
            <AnimatedGlossaryWrapper
                {...this.props}
                loading={this.state.loading}
                error={this.state.error}
                searchLoading={this.state.searchLoading}
                performSearch={this.performSearch} />
        );
    }
}

GlossaryContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        glossary: state.glossary
    }),
    (dispatch) => bindActionCreators(glossaryActions, dispatch)
)(GlossaryContainer);
