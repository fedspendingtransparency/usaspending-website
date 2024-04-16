/**
  * TimeVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, capitalize } from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TooltipWrapper } from 'data-transparency-ui';
import { fullMonthFromAbbr } from 'helpers/monthHelper';
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";

import TimeVisualizationPeriodButton from './TimeVisualizationPeriodButton';
import GlossaryLink from '../../../sharedComponents/GlossaryLink';
import ReadMore from '../../../sharedComponents/ReadMore';
import TimeVisualizationChart from "./TimeVisualizationChart";

const propTypes = {
    data: PropTypes.object,
    updateVisualizationPeriod: PropTypes.func,
    visualizationPeriod: PropTypes.string,
    subaward: PropTypes.bool,
    loading: PropTypes.bool
};

export default class TimeVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            tableTitle: "",
            tableBody: "",
            tablePreview: "",
            expanded: null
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
        this.handleUpdateBody = this.handleUpdateBody.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        this.handleUpdateTitle();
        this.handleUpdateBody();
        window.addEventListener('resize', this.handleWindowResize);
    }
    componentDidUpdate(prevProps) {
        if (!this.state.expanded || this.state.expanded === null) {
            const elem = document.querySelector(".read-more__preview-lines");
            elem?.classList.add("line-clamp");
        }

        if (this.props.subaward !== prevProps.subaward) {
            this.handleUpdateTitle();
            this.handleUpdateBody();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    getDownloadData = () => {
        const headers = [];
        headers.fiscal_year = 'fiscal_year,total_obligations\n';
        headers.quarter = 'fiscal_year,fiscal_quarter,total_obligations\n';
        headers.month = 'fiscal_year,month,total_obligations\n';
        const data = this.props.data;

        return headers[this.props.visualizationPeriod].concat(
            data.rawLabels.map((label, i) => {
                if (this.props.visualizationPeriod === 'fiscal_year') {
                    return `${label.year},${data.ySeries[i][0]}`;
                }
                if (!label.period) { // API still updating data
                    return null;
                }
                if (this.props.visualizationPeriod === 'quarter') {
                    return `${label.year},${label.period[1]},${data.ySeries[i][0]}`;
                }
                const month = fullMonthFromAbbr(label.period);
                return `${['Oct', 'Nov', 'Dec'].indexOf(label.period) > -1 ? parseInt(label.year, 10) + 1 : label.year},${month},${data.ySeries[i][0]}`;
            })
                .join('\n')
        );
    };

    downloadTooltip = () => (
        <>
            <div className="tooltip__title">Download data by {capitalize(this.props.visualizationPeriod === 'fiscal_year' ? 'year' : this.props.visualizationPeriod)}</div>
            <div className="tooltip__text">
                Download a CSV of award spending data that matches your search criteria, broken down by {this.props.visualizationPeriod === 'fiscal_year' ? 'year' : this.props.visualizationPeriod}. For complete download results, click on the &quot;Download&quot; button on the top right of this page.
            </div>
        </>
    );

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

    handleUpdateTitle() {
        const primeAwardTitle = "Spending by Time";
        const subAwardTitle = "Sub-Award Spending Over Time";
        const dropdownValue = document.querySelector(".filter__dropdown-button-text");
        if (dropdownValue === "Subawards") {
            this.setState({
                tableTitle: subAwardTitle
            });
        }
        else {
            this.setState({
                tableTitle: primeAwardTitle
            });
        }
    }

    handleUpdateBody() {
        const dropdownValue = document.querySelector(".filter__dropdown-button-text");
        const primeAwardPreview = "Spot trends in spending over your chosen time period. Break down your results by years, quarters, or months.";
        const primeAwardBody = <>
            {getAtdDefcText(this.props.isDefCodeInFilter?.length > 0)}
            <p className="award-search__body-text">The data in the chart below represent <span className="award-search__glossary-term">federal action</span>{' '}<GlossaryLink term="federal-action-obligation" /> {<span className="award-search__glossary-term"> obligation</span>}{' '}{<GlossaryLink term="obligation" />} amounts for non-loan prime award {<span className="award-search__glossary-term"> transactions</span>}{' '}{<GlossaryLink term="transaction" />} within the selected filters. Loan awards use the {<span className="award-search__glossary-term">subsidy cost</span>}{' '}{<GlossaryLink term="loan-subsidy-cost" />} rather than the obligated amount to sum up the value of the loan. Prime award transactions with the same unique award ID are grouped under a single prime award summary. Prime award summaries can be viewed in the Table tab.</p>
        </>;

        const subAwardPreview = "Spot trends in spending over your chosen time period. Break down your results by years, quarters, or months.";
        const subAwardBody = (
            <>
                {getAtdDefcText(this.props.isDefCodeInFilter?.length > 0)}
                <p className="award-search__body-text">The data below represent{<span className="award-search__glossary-term"> sub-awards</span>}{' '}{<GlossaryLink term="sub-award" />} that meet the selected filter criteria. The results do not reflect sub-awards whose
                    {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink term="prime-award" />}
                    {' '}meet the selected filter criteria. For example, if you filter by Fiscal Year 2019, you will see only sub-awards with Action Dates in Fiscal Year 2019, but you will not see all sub-awards whose prime award overlaps with Fiscal Year 2019.
                </p>
                <p className="award-search__body-text">
                    Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                </p>
            </>);
        if (dropdownValue === "Subawards") {
            this.setState({
                tableBody: subAwardBody,
                tablePreview: subAwardPreview
            });
        }
        else {
            this.setState({
                tableBody: primeAwardBody,
                tablePreview: primeAwardPreview
            });
        }
    }

    // eslint-disable-next-line no-undef
    downloadBlob = () => new Blob([this.getDownloadData()], { type: 'text/csv;charset=utf-8;' });

    renderDownloadLink = () => (
        <a
            href={URL.createObjectURL(this.downloadBlob())}
            download="spending-over-time.csv" >
            <FontAwesomeIcon icon="download" size="lg" />
            <span className="text">
                Download data by {capitalize(this.props.visualizationPeriod === 'fiscal_year' ? 'year' : this.props.visualizationPeriod)}
            </span>
        </a>
    );

    render() {
        const applyLineClamp = (elem) => {
            elem.classList.add("line-clamp");
        };

        const removeLineClamp = (elem) => {
            elem.classList.remove("line-clamp");
        };

        const additionalFunctionality = (expanded) => {
            const elem = document.querySelector(".read-more__preview-lines");
            this.setState({ expanded: !expanded });
            if (!expanded) {
                removeLineClamp(elem);
            }
            else {
                applyLineClamp(elem);
            }
        };
        return (
            <section
                className="results-visualization-time-section"
                id="results-section-time"
                aria-label="Spending Over Time">
                <h2 className="visualization-title">
                    {this.state.tableTitle}
                </h2>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />
                <div className="visualization-top">
                    <div className="visualization-description">
                        <p className="award-search__what-title">What's included in this view of the data?</p>
                        <div className="content">
                            <ReadMore openPrompt="read more" closePrompt="read less" openIcon="" closeIcon="" showPreview previewLines={this.state.tablePreview} additionalFunctionality={additionalFunctionality}>{this.state.tableBody}</ReadMore>
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="fiscal_year"
                                        label="Years"
                                        active={this.props.visualizationPeriod === 'fiscal_year'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="quarter"
                                        label="Quarters"
                                        active={this.props.visualizationPeriod === 'quarter'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                                <li>
                                    <TimeVisualizationPeriodButton
                                        value="month"
                                        label="Months"
                                        active={this.props.visualizationPeriod === 'month'}
                                        changePeriod={this.props.updateVisualizationPeriod} />
                                </li>
                            </ul>
                        </div>
                        <div className="download">
                            {!this.props.data.loading && this.renderDownloadLink()}
                            {!this.props.data.loading && <TooltipWrapper className="tooltip-wrapper" icon="info" tooltipPosition="left" tooltipComponent={this.downloadTooltip()} />}
                        </div>
                    </div>
                </div>
                <TimeVisualizationChart
                    visualizationPeriod={this.props.visualizationPeriod}
                    {...this.props.data}
                    width={this.state.visualizationWidth} />
            </section>
        );
    }
}

TimeVisualizationSection.propTypes = propTypes;
