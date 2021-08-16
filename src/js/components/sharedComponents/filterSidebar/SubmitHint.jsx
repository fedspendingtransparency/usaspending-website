/**
 * SubmitHint.jsx
 * Created by Kevin Li 12/28/17
 */

import React from 'react';
import { CheckCircle } from 'components/sharedComponents/icons/Icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
        return (
            <TransitionGroup>
                {!this.state.hideHint && (
                    <CSSTransition
                        classNames="hint-fade"
                        timeout={200}
                        appear
                        exit>
                        <div className="filter-submit-hint" aria-hidden="true">
                            <div className="hint-icon">
                                <CheckCircle alt="Filter selected" />
                            </div>
                            <div className="hint-text">
                                <div className="hint-title">
                                    Filter Updated.
                                </div>
                                <div className="hint-description">
                                    Submit your search to see results.
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>
        );
    }
}
