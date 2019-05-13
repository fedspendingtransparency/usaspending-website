import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComingSoonSection from "../ComingSoonSection";
import InfoTooltip from '../InfoTooltip';
import { idvActivityInfo } from '../InfoTooltipContent';

const propTypes = {
};

export default class IdvActivity extends React.Component {
    render() {
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
                    <ComingSoonSection className="idv-activity__section" />
                </div>
            </div>
        );
    }
}
IdvActivity.propTypes = propTypes;
