import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InfoTooltip from './InfoTooltip';

const propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    toolTip: PropTypes.bool,
    toolTipAlignLeft: PropTypes.bool,
    toolTipContent: PropTypes.node,
    includeHeader: PropTypes.bool,
    children: PropTypes.node
};

const defaultProps = {
    toolTip: false,
    includeHeader: false
};

const ComingSoonSection = ({
    title,
    icon,
    toolTip,
    toolTipAlignLeft,
    toolTipContent,
    includeHeader,
    children
}) => {
    const renderChildren = () => (children || <h4>Coming Soon</h4>);

    if (includeHeader) {
        return (
            <div className="award__col award-viz award-funding-summary" >
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <FontAwesomeIcon size="lg" icon={icon} />
                    </div>
                    <h3 className="award-viz__title">{title}</h3>
                    {toolTip &&
                        <InfoTooltip left={toolTipAlignLeft}>
                            {toolTipContent}
                        </InfoTooltip>}
                </div>
                <hr />
                <div className="coming-soon__section">
                    {renderChildren()}
                </div>
            </div>
        );
    }
    return <div className="coming-soon__section">{renderChildren()}</div>;
};

ComingSoonSection.propTypes = propTypes;
ComingSoonSection.defaultProps = defaultProps;

export default ComingSoonSection;
