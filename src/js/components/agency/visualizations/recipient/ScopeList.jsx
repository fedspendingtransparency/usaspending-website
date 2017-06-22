/**
 * ScopeList.jsx
 * Created by Kevin Li 6/12/17
 */

import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';

import RankVisualizationScopeButton from
    'components/search/visualizations/rank/RankVisualizationScopeButton';

const propTypes = {
    scope: React.PropTypes.string,
    changeScope: React.PropTypes.func
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
                            <li className="coming-soon">
                                <RankVisualizationScopeButton
                                    value="contracts"
                                    label="Contracts"
                                    active={this.props.scope === 'contracts'}
                                    changeScope={this.props.changeScope}
                                    disabled />
                                <ComingSoonLabel />
                            </li>
                            <li className="coming-soon">
                                <RankVisualizationScopeButton
                                    value="grants"
                                    label="Grants"
                                    active={this.props.scope === 'grants'}
                                    changeScope={this.props.changeScope}
                                    disabled />
                                <ComingSoonLabel />
                            </li>
                            <li className="coming-soon">
                                <RankVisualizationScopeButton
                                    value="direct_payments"
                                    label="Direct Payments"
                                    active={this.props.scope === 'direct_payments'}
                                    changeScope={this.props.changeScope}
                                    disabled />
                                <ComingSoonLabel />
                            </li>
                            <li className="coming-soon">
                                <RankVisualizationScopeButton
                                    value="loans"
                                    label="Loans"
                                    active={this.props.scope === 'loans'}
                                    changeScope={this.props.changeScope}
                                    disabled />
                                <ComingSoonLabel />
                            </li>
                            <li className="coming-soon">
                                <RankVisualizationScopeButton
                                    value="insurance"
                                    label="Insurance"
                                    active={this.props.scope === 'insurance'}
                                    changeScope={this.props.changeScope}
                                    disabled />
                                <ComingSoonLabel />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

ScopeList.propTypes = propTypes;
