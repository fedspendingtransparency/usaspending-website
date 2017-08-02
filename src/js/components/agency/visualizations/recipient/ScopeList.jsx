/**
 * ScopeList.jsx
 * Created by Kevin Li 6/12/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import RankVisualizationScopeButton from
    'components/search/visualizations/rank/RankVisualizationScopeButton';

const propTypes = {
    scope: PropTypes.string,
    changeScope: PropTypes.func
};

export default class ScopeList extends React.Component {
    render() {
        return (
            <div className="recipient-scope">
                <div className="visualization-period">
                    <div className="content">
                        <ul>
                            <li>
                                <RankVisualizationScopeButton
                                    value="all"
                                    label="All"
                                    active={this.props.scope === 'all'}
                                    changeScope={this.props.changeScope} />
                            </li>
                            <li>
                                <RankVisualizationScopeButton
                                    value="contract"
                                    label="Contracts"
                                    active={this.props.scope === 'contract'}
                                    changeScope={this.props.changeScope} />
                            </li>
                            <li>
                                <RankVisualizationScopeButton
                                    value="grant"
                                    label="Grants"
                                    active={this.props.scope === 'grant'}
                                    changeScope={this.props.changeScope} />
                            </li>
                            <li>
                                <RankVisualizationScopeButton
                                    value="direct payments"
                                    label="Direct Payments"
                                    active={this.props.scope === 'direct payments'}
                                    changeScope={this.props.changeScope} />
                            </li>
                            <li>
                                <RankVisualizationScopeButton
                                    value="loans"
                                    label="Loans"
                                    active={this.props.scope === 'loans'}
                                    changeScope={this.props.changeScope} />
                            </li>
                            <li>
                                <RankVisualizationScopeButton
                                    value="other"
                                    label="Other"
                                    active={this.props.scope === 'other'}
                                    changeScope={this.props.changeScope} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

ScopeList.propTypes = propTypes;
