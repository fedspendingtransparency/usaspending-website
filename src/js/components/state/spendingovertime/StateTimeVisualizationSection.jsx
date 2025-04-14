/**
 * StateTimeVisualizationSection.jsx
 * Created by David Trinh 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionHeader } from 'data-transparency-ui';

import TimeVisualizationPeriodButton from 'components/search/newResultsView/time/TimeVisualizationPeriodButton';
import StateTimeVisualizationChart from './StateTimeVisualizationChart';
import RoundedToggle from "../../sharedComponents/RoundedToggle";
import Accordion from "../../sharedComponents/accordion/Accordion";
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    visualizationPeriod: PropTypes.string,
    updateVisualizationPeriod: PropTypes.func,
    outlayToggle: PropTypes.bool,
    onKeyOutlaysToggle: PropTypes.func,
    onOutlaysToggle: PropTypes.func
};

export default class StateTimeVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            outlayWhatOpen: false
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.setWhatOpen = this.setWhatOpen.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    setWhatOpen = () => {
        this.setState({
            outlayWhatOpen: !this.state.outlayWhatOpen
        });
    };

    handleWindowResize() {
    // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionHr.offsetWidth
            });
        }
    }

    render() {
        return (
            <section
                id="state-transactions-over-time"
                className="state-section transactions-over-time">
                <SectionHeader
                    icon={<FontAwesomeIcon icon="chart-bar" size="2x" />}
                    title="Awards Over Time"
                    titleTooltip={{ component: false }}
                    descTooltip={{ component: false }} />
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />
                <div className="state-section__description">
                    The graph below shows trends over time for amounts awarded to this state. Break down the amounts by years, quarters, or months, and hover over the bars for more detailed information.
                </div>
                <div className="state__controls-desktop">
                    <RoundedToggle toggle={this.props.outlayToggle} onKeyToggle={this.props.onKeyOutlaysToggle} onToggle={this.props.onOutlaysToggle} label="View Outlays" id="state__controls-toggle" />
                    <div className="state__line-div" />
                    <Accordion setOpen={this.setWhatOpen} closedIcon="chevron-down" openIcon="chevron-up" title="What is this?" />
                </div>
                {this.state.outlayWhatOpen &&
                    <div className="state__what-content">
                        <FontAwesomeIcon icon="info-circle" className="state__info-icon" />
                        <p className="state__what-heading">What is an outlay?</p>
                        <p className="state__what-text">An <span className="state__emphasis">outlay</span> <GlossaryLink term="outlay" /> is money that has been paid out from a federal account. This should not be confused with an <span className="state__emphasis">obligation&nbsp;<GlossaryLink term="obligation" /></span> , which is money the federal government has promised to pay (for example, when signing a contract or awarding a grant). Outlays are the transactions that pay off the federal government&apos;s obligations.</p>
                        <p className="state__what-second-heading">Why are the obligation and budgetary resource amounts no longer visible on the chart?</p>
                        <p className="state__what-text">Remember, the <span className="state__emphasis">budgetary resources</span> <GlossaryLink term="budgetary-resources" /> and obligations on this chart refer to available amounts and promised amounts for spending in your selected fiscal year. However, agencies may make outlays to pay off obligations made in your selected year or in previous years. This means outlays on this chart should <span className="state__emphasis">not</span> be compared to the obligations or budgetary resources within any single fiscal year.</p>
                    </div>}
                <div className="state-visualization-period">
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="fiscal_year"
                                        label="Years"
                                        active={this.props.data.visualizationPeriod === 'fiscal_year'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="quarter"
                                        label="Quarter"
                                        active={this.props.data.visualizationPeriod === 'quarter'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="month"
                                        label="Month"
                                        active={this.props.data.visualizationPeriod === 'month'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <StateTimeVisualizationChart
                    visualizationPeriod={this.props.visualizationPeriod}
                    loading={this.props.loading}
                    data={this.props.data}
                    width={this.state.visualizationWidth}
                    outlayToggle={this.props.outlayToggle} />
            </section>
        );
    }
}

StateTimeVisualizationSection.propTypes = propTypes;
