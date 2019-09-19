import React from 'react';
import { AWARD_SECTION_HEADER_PROPS } from "../../../propTypes/index";
import InfoTooltip from '../shared/InfoTooltip';

const AwardSectionHeader = ({
    icon,
    title,
    tooltip
}) => (
    <React.Fragment>
        <div className="award-viz__heading">
            {icon && <div className="award-viz__icon">{icon}</div>}
            <h3 className="award-viz__title">{title}</h3>
            {tooltip && (
                <InfoTooltip left>
                    {tooltip}
                </InfoTooltip>
            )}
        </div>
        <hr />
    </React.Fragment>
);

AwardSectionHeader.propTypes = AWARD_SECTION_HEADER_PROPS;
export default AwardSectionHeader;
