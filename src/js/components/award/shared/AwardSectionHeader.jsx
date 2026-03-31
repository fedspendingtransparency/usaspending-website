import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';

import { AWARD_SECTION_HEADER_PROPS } from "../../../propTypes/index";

const AwardSectionHeader = ({
    icon,
    title,
    tooltip,
    tooltipWide = false,
    left = true
}) => {
    const content = (
        <><p>This section displays the awards:</p><p><span>Transaction History </span>- Displays modification records for an award. Each modification appears as a row in the table below.</p><p><span>Sub-Awards </span>- Displays any sub-contracts reported by this contract's recipient (the 'prime recipient' in the sub-award context). Sub-contracts are contractual agreements that a prime recipient makes with another entity (sub-recipient) to furnish supplies or services for the prime contract. Above the Sub-Award table, we display the total number of reported sub-contract actions and their total value.</p><p><span>Federal Account Funding </span>- Each row in this table shows a transaction in the awarding agency's financial system that promises spending for the award from a federal account (a rollup of TAS, or Treasury accounts), broken down by program activity and object class.</p></>
    );
    return (
        <React.Fragment>
            <div className="award-viz__heading">
                {icon && <div className="award-viz__icon">{icon}</div>}
                <h3 className="award-viz__title">{title}</h3>
                {tooltip && title !== "Award History" &&
            <TooltipWrapper
                className="award-section-tt"
                icon="info"
                tooltipPosition={left ? 'left' : 'right'}
                wide={tooltipWide}
                tooltipComponent={tooltip} />}
            </div>
            <hr />
            {title === "Award History" && content}
        </React.Fragment>
    );
};

AwardSectionHeader.propTypes = AWARD_SECTION_HEADER_PROPS;
export default AwardSectionHeader;
