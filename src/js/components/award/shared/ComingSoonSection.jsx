import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TooltipWrapper } from 'data-transparency-ui';
import AwardSection from './AwardSection';

const propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    className: PropTypes.string,
    toolTipWide: PropTypes.bool,
    toolTipAlignLeft: PropTypes.bool,
    includeHeader: PropTypes.bool,
    toolTipContent: PropTypes.node,
    children: PropTypes.node
};

const defaultProps = {
    tooltipWide: false,
    tooltipContent: null,
    includeHeader: false,
    className: null
};

const ComingSoonSection = ({
    title,
    icon,
    toolTipWide,
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
            <AwardSection type="column" className="award-viz">
                <div className="award__col__content">
                    <div className="award-viz__heading">
                        {icon &&
                        <div className="award-viz__icon">
                            <FontAwesomeIcon size="lg" icon={icon} />
                        </div>}
                        <h3 className="award-viz__title">{title}</h3>
                        {toolTipContent && (
                            <TooltipWrapper
                                className="award-section-tt"
                                icon="info"
                                tooltipPosition={toolTipAlignLeft ? 'left' : 'right'}
                                wide={toolTipWide}
                                tooltipComponent={toolTipContent} />
                        )}
                    </div>
                    <hr />
                    <div className={comingSoonClass}>
                        {renderChildren()}
                    </div>
                </div>
            </AwardSection>
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
