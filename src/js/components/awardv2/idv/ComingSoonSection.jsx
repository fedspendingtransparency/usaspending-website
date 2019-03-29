import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InfoTooltip from './InfoTooltip';

const propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
    toolTip: PropTypes.bool,
    toolTipAlignLeft: PropTypes.bool,
    includeHeader: PropTypes.bool,
    toolTipContent: PropTypes.node,
    children: PropTypes.node
};

const defaultProps = {
    toolTip: false,
    includeHeader: false,
    className: null
};

const ComingSoonSection = ({
    title,
    icon,
    toolTip,
    toolTipAlignLeft,
    toolTipContent,
    includeHeader,
    children,
    className
}) => {
    const renderChildren = () => (
        children || (
            <div>
                <h4>Coming Soon</h4>
                <p>This feature is currently under development.</p>
            </div>
        )
    );

    const comingSoonClass = className || "coming-soon__section";

    if (includeHeader) {
        return (
            <div className="award__col award-viz">
                <div className="award__col__content">
                    <div className="award-viz__heading">
                        {icon &&
                            <div className="award-viz__icon">
                                <FontAwesomeIcon size="lg" icon={icon} />
                            </div>}
                        <h3 className="award-viz__title">{title}</h3>
                        {toolTip && (
                            <InfoTooltip left={toolTipAlignLeft}>
                                {toolTipContent}
                            </InfoTooltip>
                        )}
                    </div>
                    <hr />
                    <div className={comingSoonClass}>
                        {renderChildren()}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className={comingSoonClass}>
            {renderChildren()}
        </div>
    );
};

ComingSoonSection.propTypes = propTypes;
ComingSoonSection.defaultProps = defaultProps;

export default ComingSoonSection;
