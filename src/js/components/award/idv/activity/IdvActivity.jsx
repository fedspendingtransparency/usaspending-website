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

const IdvActivity = (props) => {
    let content;
    let message;
    if (props.inFlight) {
        message = (<ResultsTableLoadingMessage />);
    }
    else if (props.error) {
        message = (<ResultsTableErrorMessage />);
    }
    else if (!props.awards.length) {
        message = (<NoResultsMessage />);
    }
    else {
        content = (<IdvActivityVisualization
            page={props.page}
            total={props.total}
            limit={props.limit}
            awards={props.awards}
            changePage={props.changePage}
            xSeries={props.xSeries}
            ySeries={props.ySeries}
            selectedItemFunc={props.selectedItemFunc} />);
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
};

IdvActivity.propTypes = propTypes;
export default IdvActivity;
