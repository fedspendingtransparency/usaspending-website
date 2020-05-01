import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';

import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import NoResultsMessage from 'components/sharedComponents/NoResultsMessage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { idvActivityInfo } from '../../shared/InfoTooltipContent';
import IdvActivityVisualization from './IdvActivityVisualization';

const propTypes = {
    awards: PropTypes.array,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    total: PropTypes.number,
    limit: PropTypes.number,
    changePage: PropTypes.func,
    xSeries: PropTypes.array,
    ySeries: PropTypes.array,
    selectedItemFunc: PropTypes.func
};

export default class IdvActivity extends React.Component {
    render() {
        let content;
        let message;
        if (this.props.inFlight) {
            message = (<ResultsTableLoadingMessage />);
        }
        else if (this.props.error) {
            message = (<ResultsTableErrorMessage />);
        }
        else if (!this.props.awards.length) {
            message = (<NoResultsMessage />);
        }
        else {
            content = (<IdvActivityVisualization
                page={this.props.page}
                total={this.props.total}
                limit={this.props.limit}
                awards={this.props.awards}
                changePage={this.props.changePage}
                xSeries={this.props.xSeries}
                ySeries={this.props.ySeries}
                selectedItemFunc={this.props.selectedItemFunc} />);
        }

        return (
            <div className="award__col award-viz idv-activity">
                <div className="award__col__content">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <FontAwesomeIcon size="lg" icon="chart-area" />
                        </div>
                        <h3 className="award-viz__title">IDV Activity</h3>
                        <TooltipWrapper
                            className="award-section-tt"
                            icon="info"
                            wide
                            tooltipComponent={idvActivityInfo} />
                    </div>
                    <hr />
                    <div className="results-table-message-container">
                        {message}
                    </div>
                    {content}
                </div>
            </div>
        );
    }
}
IdvActivity.propTypes = propTypes;
