/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';

import BudgetFunctions from './BudgetFunctions/BudgetFunctions';
import BudgetSubfunctions from './BudgetSubfunctions/BudgetSubfunctions';
import TreeMapLine from './TreeMapLine';

const propTypes = {
    categories: PropTypes.object,
    colors: PropTypes.array,
    descriptions: PropTypes.array,
    subfunctions: PropTypes.object,
    alternateColors: PropTypes.array,
    tooltipStyles: PropTypes.object,
    totalNumber: PropTypes.number
};

export default class TreeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            showSubfunctions: false,
            selected: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.toggleSubfunction = this.toggleSubfunction.bind(this);
        this.changeActiveSubfunction = this.changeActiveSubfunction.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({
                windowWidth
            });
        }
    }

    toggleSubfunction(selected = 0) {
        this.setState({
            showSubfunctions: !this.state.showSubfunctions,
            selected
        }, () => {
            if (!this.state.showSubfunctions) {
                // send focus back to the figure
                const budgetTreemapSvg = document.querySelector('#budget-function-svg');
                if (budgetTreemapSvg) {
                    budgetTreemapSvg.focus();
                }
            }
        });
    }

    changeActiveSubfunction(selected) {
        this.setState({ selected });
    }

    generateIntro() {
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

        return intro;
    }

    generateLine() {
        let line = null;

        if (this.state.windowWidth >= 768) {
            line = (<TreeMapLine
                rectTransform="translate(0,0)rotate(0)"
                textTransform="translate(44,15)rotate(0)"
                label="All Functions" />);
        }

        return line;
    }

    generateFunctions() {
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

        return functions;
    }

    render() {
        return (
            <div
                className="usa-da-treemap-section"
                ref={(sr) => {
                    this.sectionWrapper = sr;
                }}>
                {this.generateIntro()}
                {this.generateLine()}
                {this.generateFunctions()}
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
