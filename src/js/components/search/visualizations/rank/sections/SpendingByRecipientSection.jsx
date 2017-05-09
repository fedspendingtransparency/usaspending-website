/**
 * SpendingByRecipientSection.jsx
 * Created by michaelbray on 4/27/17.
 */

import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import RankVisualizationScopeButton from '../RankVisualizationScopeButton';
import RankVisualizationSection from './RankVisualizationSection';

const propTypes = {
    scope: React.PropTypes.string,
    changeScope: React.PropTypes.func
};

export default class SpendingByRecipientSection extends React.Component {
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top recipients from highest to lowest. Filter
                            your results more (at left) and watch this graph update automatically.
                            View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li className="coming-soon">
                                    <RankVisualizationScopeButton
                                        value="parentCompany"
                                        label="Parent Company (Parent DUNS)"
                                        active={this.props.scope === 'parentCompany'}
                                        changeScope={this.props.changeScope}
                                        disabled />
                                    <ComingSoonLabel />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="subsidiary"
                                        label="Subsidiary (DUNS)"
                                        active={this.props.scope === 'subsidiary'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li className="coming-soon">
                                    <RankVisualizationScopeButton
                                        value="recipientType"
                                        label="Recipient Type"
                                        active={this.props.scope === 'recipientType'}
                                        changeScope={this.props.changeScope}
                                        disabled />
                                    <ComingSoonLabel />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByRecipientSection.propTypes = propTypes;
