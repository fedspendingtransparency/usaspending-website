/**
 * SpendingByCategorySection.jsx
 * Created by Kevin Li 12/13/16
 **/

import React from 'react';

import RankVisualizationScopeButton from '../RankVisualizationScopeButton';
import RankVisualizationSection from './RankVisualizationSection';

const propTypes = {
    scope: React.PropTypes.string,
    changeScope: React.PropTypes.func
};

export default class SpendingByCategorySection extends React.Component {
    render() {
        return (
            <RankVisualizationSection
                {...this.props}
                urlRoot="#/federal_account/">
                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top budget categories from highest to lowest. Filter
                            your results more (at left) and watch this graph update automatically.
                            View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="budgetFunctions"
                                        label="Budget Functions"
                                        active={this.props.scope === 'budgetFunctions'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="federalAccounts"
                                        label="Federal Accounts"
                                        active={this.props.scope === 'federalAccounts'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="objectClasses"
                                        label="Object Classes"
                                        active={this.props.scope === 'objectClasses'}
                                        changeScope={this.props.changeScope} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByCategorySection.propTypes = propTypes;
