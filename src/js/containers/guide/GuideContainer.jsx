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
    setGuideTerm: React.PropTypes.func
};

export class GuideContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false
        };

        this.queuedOperations = [];

        this.request = null;
    }
    componentDidMount() {
        GuideListenerSingleton.subscribe(this);

        this.fetchGuideList();
    }

    componentWillUnmount() {
        GuideListenerSingleton.unsubscribe(this);
    }

    fetchGuideList() {
        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            loading: true
        });

        this.request = GuideHelper.fetchAllTerms();

        this.request.promise
            .then((res) => {
                this.setState({
                    loading: false,
                    error: false
                });
                this.request = null;

                this.parseTerms(res);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }

                this.setState({
                    loading: false,
                    error: true
                });
                this.request = null;
            });
    }


    parseTerms(res) {
        const terms = [];
        res.data.results.forEach((result) => {
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

    detectedUrlChange(value) {
        // we've receivd a special URL param for a specific guide term
        if (this.state.loading) {
            // still loading, queue this operation up for later
            const operation = this.jumpToTerm.bind(this, value);
            this.queuedOperations.push(operation);
            return;
        }

        this.jumpToTerm(value);
    }

    jumpToTerm(term) {
        // look for a matching slug
        const index = _.findIndex(this.props.guide.search.results, {
            slug: term
        });

        if (index > -1) {
            // we found the term, load the word
            const result = this.props.guide.search.results[index];
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
                error={this.state.error} />
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
