/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

import BudgetFunctions from './BudgetFunctions/BudgetFunctions';
import BudgetSubfunctions from './BudgetSubfunctions/BudgetSubfunctions';

const propTypes = {
    categories: React.PropTypes.object,
    colors: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    subfunctions: React.PropTypes.object,
    alternateColors: React.PropTypes.array,
    tooltipStyles: React.PropTypes.object,
    totalNumber: React.PropTypes.number
};

export default class TreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSubfunctions: false,
            selected: 0
        };

        this.toggleSubfunction = this.toggleSubfunction.bind(this);
        this.changeActiveSubfunction = this.changeActiveSubfunction.bind(this);
    }

    toggleSubfunction(selected) {
        this.setState({
            showSubfunctions: !this.state.showSubfunctions,
            selected
        });
    }

    changeActiveSubfunction(selected) {
        this.setState({ selected });
    }

    render() {
        let intro = null;

        if (this.state.showSubfunctions === false) {
            intro = (
                <div className="tree-desc">
                    <b>3</b> of the <b>19</b> total budget functions, accounted for about
                    &nbsp;<b>1/2</b> of total spending. <br />
                    <span className="highlight">Social Security</span>,&nbsp;
                    <span className="highlight">National Defense</span>,
                    and <span className="highlight">Medicare</span>.
                </div>
            );
        }

        let functions = (<BudgetFunctions
            {...this.props}
            {...this.state}
            toggleSubfunction={this.toggleSubfunction} />);

        if (this.state.showSubfunctions === true) {
            functions = (<BudgetSubfunctions
                {...this.props}
                {...this.state}
                toggleSubfunction={this.toggleSubfunction}
                changeActiveSubfunction={this.changeActiveSubfunction} />);
        }

        return (
            <div className="usa-da-treemap-section">
                {intro}
                {functions}
                <div className="source">
                    Source: Monthly Treasury Statement
                    <div className="info-icon-circle">
                        <Icons.InfoCircle />
                    </div>
                    <div className="more-icon">
                        <Icons.MoreOptions />
                    </div>
                </div>
            </div>
        );
    }

}
TreeMap.propTypes = propTypes;
