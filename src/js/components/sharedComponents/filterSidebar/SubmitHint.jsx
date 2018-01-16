/**
 * SubmitHint.jsx
 * Created by Kevin Li 12/28/17
 */

import React from 'react';
import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class SubmitHint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hideHint: true
        };

        this.hideTimer = null;
    }

    componentDidMount() {
        this.hideHint();
    }

    componentWillUnmount() {
        if (this.hideTimer) {
            window.clearTimeout(this.hideTimer);
        }
    }

    hideHint() {
        this.hideTimer = window.setTimeout(() => {
            this.setState({
                hideHint: true
            });
            this.hideTimer = null;
        }, 2000);
    }

    showHint() {
        if (this.hideTimer) {
            window.clearTimeout(this.hideTimer);
        }

        if (this.state.hideHint) {
            this.setState({
                hideHint: false
            });
        }

        this.hideHint();
    }

    render() {
        let content = (
            <div
                className="filter-submit-hint"
                aria-hidden="true">
                <div className="hint-icon">
                    <CheckCircle alt="Filter selected" />
                </div>
                <div className="hint-text">
                    <div className="hint-title">
                        Filter Selected.
                    </div>
                    <div className="hint-description">
                        Submit your search to see results.
                    </div>
                </div>
            </div>
        );

        if (this.state.hideHint) {
            content = null;
        }

        return (
            <CSSTransitionGroup
                transitionName="hint-fade"
                transitionLeaveTimeout={200}
                transitionEnterTimeout={200}
                transitionAppearTimeout={200}
                transitionAppear
                transitionLeave>
                {content}
            </CSSTransitionGroup>
        );
    }
}
