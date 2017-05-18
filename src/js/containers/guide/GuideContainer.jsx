/**
 * GuideContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';
import _ from 'lodash';

import GuideListenerSingleton from 'containers/router/GuideListenerSingleton';
import * as GuideHelper from 'helpers/guideHelper';

import AnimatedGuideWrapper from 'components/guide/AnimatedGuideWrapper';

import * as guideActions from 'redux/actions/guide/guideActions';
import { Definition } from 'redux/reducers/guide/guideReducer';

const propTypes = {
    guide: React.PropTypes.object,
    setGuideResults: React.PropTypes.func,
    showGuide: React.PropTypes.func,
    setGuideTerm: React.PropTypes.func,
    setGuideCache: React.PropTypes.func
};

export class GuideContainer extends React.Component {
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
        GuideListenerSingleton.subscribe(this);

        // on the first load, populate the cache
        if (this.props.guide.cache.count() === 0) {
            // no cache set yet, populate it
            // we need to build a cache because when the guide is searched, it may internally link
            // terms that are no longer in the results array
            this.populateCache();
        }
        else {
            // we have a cache set, just do a search
            this.performSearch();
        }
    }

    componentWillUnmount() {
        GuideListenerSingleton.unsubscribe(this);
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

        this.request = GuideHelper.fetchAllTerms();

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
        const input = this.props.guide.search.input;

        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            searchLoading: true
        });

        this.request = GuideHelper.fetchSearchResults({
            fields: ['term'],
            value: input,
            matched_objects: true,
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

                this.parseTerms(res.data.matched_objects.term);
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

        this.props.setGuideResults(terms);

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

        this.props.setGuideCache(terms);
    }

    detectedUrlChange(value) {
        // we've received a special URL param for a specific guide term
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
        if (this.props.guide.cache.has(slug)) {
            // we found the term, load the word
            const result = this.props.guide.cache.get(slug);
            this.props.setGuideTerm(result);
            // now force open the guide
            this.props.showGuide();
        }
    }

    render() {
        return (
            <AnimatedGuideWrapper
                {...this.props}
                loading={this.state.loading}
                error={this.state.error}
                searchLoading={this.state.searchLoading}
                performSearch={this.performSearch} />
        );
    }
}

GuideContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        guide: state.guide
    }),
    (dispatch) => bindActionCreators(guideActions, dispatch)
)(GuideContainer);
