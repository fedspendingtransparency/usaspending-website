/**
 * GlossaryContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import GlossaryListenerSingleton from 'containers/router/GlossaryListenerSingleton';
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
    setGlossaryCache: PropTypes.func
};

export class GlossaryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            searchLoading: false,
            error: false
        };

        this.queuedOperations = [];

        this.request = null;

        this.performSearch = this.performSearch.bind(this);
    }
    componentDidMount() {
        GlossaryListenerSingleton.subscribe(this);

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

    componentWillUnmount() {
        if (this.request) {
            this.request.cancel();
        }
        GlossaryListenerSingleton.unsubscribe(this);
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

                // okay now perform the search (which will be the same data most of the time,
                // but potentially not)
                this.performSearch();
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
        const input = this.props.glossary.search.input;

        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            searchLoading: true
        });

        this.request = GlossaryHelper.fetchSearchResults({
            search_text: input,
            limit: 500
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
        const terms = [];
        data.forEach((result) => {
            const term = new Definition(result);
            terms.push(term);
        });

        this.props.setGlossaryResults(terms);

        if (this.queuedOperations.length > 0) {
            // there are operations that were waiting for the data load, run them now
            this.queuedOperations.forEach((operation) => {
                operation();
            });
        }
    }

    writeCache(data) {
        const terms = {};
        data.forEach((result) => {
            const term = new Definition(result);
            terms[result.slug] = term;
        });

        this.props.setGlossaryCache(terms);
    }

    detectedUrlChange(value) {
        // we've received a special URL param for a specific glossary term
        if (this.state.loading) {
            // still loading, queue this operation up for later
            const operation = this.jumpToTerm.bind(this, value);
            this.queuedOperations.push(operation);
            return;
        }

        this.jumpToTerm(value);
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
