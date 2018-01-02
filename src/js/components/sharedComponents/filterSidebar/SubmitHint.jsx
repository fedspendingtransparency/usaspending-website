/**
 * SubmitHint.jsx
 * Created by Kevin Li 12/28/17
 */

import React from 'react';
import { CheckCircle } from 'components/sharedComponents/icons/Icons';

export default class SubmitHint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hideHint: false
        };

        this.hideTimer = null;
    }

    componentDidMount() {
        this.hideTimer = window.setTimeout(() => {
            this.setState({
                hideHint: true
            });
            this.hideTimer = null;
        }, 2500);
    }

    componentWillUnmount() {
        if (this.hideTimer) {
            window.clearTimeout(this.hideTimer);
        }
    }

    render() {
        if (this.state.hideHint) {
            return null;
        }

        return (
            <div className="filter-submit-hint">
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
    }
}
