/**
 * GuideContainer.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import GuideListenerSingleton from 'containers/router/GuideListenerSingleton';
import * as GuideHelper from 'helpers/guideHelper';

import AnimatedGuideWrapper from 'components/guide/AnimatedGuideWrapper';

import * as guideActions from 'redux/actions/guide/guideActions';
import { Definition } from 'redux/reducers/guide/guideReducer';

const propTypes = {
    guide: React.PropTypes.object,
    setGuideResults: React.PropTypes.func
};

export class GuideContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

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
                    loading: false
                });
                this.request = null;

                this.parseTerms(res);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                }

                this.setState({
                    loading: false
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
    }

    detectedUrlChange(value) {
        console.log(value);
    }

    render() {
        return (
            <AnimatedGuideWrapper {...this.props} />
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
