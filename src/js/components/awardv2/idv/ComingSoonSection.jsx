import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InfoTooltip from './InfoTooltip';

const propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    toolTip: PropTypes.bool,
    toolTipAlignLeft: PropTypes.bool,
    toolTipContent: PropTypes.node
};

const defaultProps = {
    icon: "chart-pie",
    toolTip: false
};

const ComingSoonSection = ({
    title,
    icon,
    toolTip,
    toolTipAlignLeft,
    toolTipContent
}) => (
    <div className="award__col award-viz award-funding-summary">
        <div className="award-viz__heading">
            <div className="award-viz__icon">
                <FontAwesomeIcon icon={icon} />
            </div>
            <h3 className="award-viz__title">{title}</h3>
            {toolTip &&
                <InfoTooltip left={toolTipAlignLeft}>
                    {toolTipContent}
                </InfoTooltip>}
        </div>
        <hr />
        <div className="coming-soon__section">
            <p>Coming Soon</p>
        </div>
    </div>
);

ComingSoonSection.propTypes = propTypes;
ComingSoonSection.defaultProps = defaultProps;

export default ComingSoonSection;
