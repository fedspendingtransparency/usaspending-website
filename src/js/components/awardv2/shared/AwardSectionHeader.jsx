import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';

import { AWARD_SECTION_HEADER_PROPS } from "../../../propTypes/index";

const AwardSectionHeader = ({
    icon,
    title,
    tooltip,
    tooltipWide = false,
    left = true
}) => (
    <React.Fragment>
        <div className="award-viz__heading">
            {icon && <div className="award-viz__icon">{icon}</div>}
            <h3 className="award-viz__title">{title}</h3>
            {tooltip && <TooltipWrapper left={left} wide={tooltipWide} tooltipComponent={tooltip} />}
        </div>
        <hr />
    </React.Fragment>
);

AwardSectionHeader.propTypes = AWARD_SECTION_HEADER_PROPS;
export default AwardSectionHeader;
