import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComingSoonSection from "../ComingSoonSection";
import InfoTooltip from '../InfoTooltip';
import { idvActivityInfo } from '../InfoTooltipContent';
import IdvActivityVisualization from './IdvActivityVisualization';

const propTypes = {
    awards: PropTypes.array,
    comingSoon: PropTypes.bool,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    total: PropTypes.number,
    limit: PropTypes.number,
    changePage: PropTypes.func,
    xSeries: PropTypes.array,
    ySeries: PropTypes.array
};

export default class IdvActivity extends React.Component {
    render() {
        let content = (
            <ComingSoonSection className="idv-activity__section" />
        );
        if (!this.props.comingSoon) {
            if (this.props.inFlight) {
                content = (<p>Loading...</p>);
            }
            else if (this.props.error) {
                content = (<p>There was an error loading the data.</p>);
            }
            else if (this.props.awards.length === 0) {
                content = (<p>No results found.</p>);
            }
            else {
                content = (<IdvActivityVisualization
                    page={this.props.page}
                    total={this.props.total}
                    count={this.props.limit}
                    awards={this.props.awards}
                    changePage={this.props.changePage}
                    xSeries={this.props.xSeries}
                    ySeries={this.props.ySeries} />);
            }
        }

        return (
            <div className="award__col award-viz idv-activity">
                <div className="award__col__content">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <FontAwesomeIcon size="lg" icon="chart-area" />
                        </div>
                        <h3 className="award-viz__title">IDV Activity</h3>
                        <InfoTooltip left wide>
                            {idvActivityInfo}
                        </InfoTooltip>
                    </div>
                    <hr />
                    {content}
                </div>
            </div>
        );
    }
}
IdvActivity.propTypes = propTypes;
