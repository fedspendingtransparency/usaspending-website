import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';
import Accordion from 'components/sharedComponents/accordion/Accordion';
import { AWARD_SECTION_HEADER_PROPS } from "../../../propTypes/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AwardSectionHeader = ({
    icon,
    title,
    tooltip,
    tooltipWide = false,
    left = true
}) => {
    const accordionTitle = <><FontAwesomeIcon icon="circle-info" /><span>Show Column Info</span></>;

    const content = (
        <>
            <p>This section displays the awards:</p>
            <p><span>Transaction History </span>- Displays modification records for an award. Each modification appears as a row in the table below.</p>
            <p><span>Sub-Awards </span>- Displays any sub-contracts reported by this contract&#39;s recipient (the &#39;prime recipient&#39; in the sub-award context). Sub-contracts are contractual agreements that a prime recipient makes with another entity (sub-recipient) to furnish supplies or services for the prime contract. Above the Sub-Award table, we display the total number of reported sub-contract actions and their total value.</p><p><span>Federal Account Funding </span>- Each row in this table shows a transaction in the awarding agency&#39;s financial system that promises spending for the award from a federal account (a rollup of TAS, or Treasury accounts), broken down by program activity and object class.</p>
            <Accordion
                title={accordionTitle}>
                <>
                    <p><span>Modification Number</span>: Identifies the modification. Modification number increment from lower to higher as more mods  are made.</p>
                    <p><span>Action Date</span>: When the modification was issued. Amount: The amount of money added or subtracted from the initial awarded amounts by the modification, if any.</p>

                    <div><span>Action Type</span>: Describes the type of modification. It uses a letter cord system that maps to the following descriptions:
                        <br/>
                        A 1 - New Award<br/>
                        B 1 - Continuation<br/>
                        EX - Other Action, Non-Financial<br/>
                        FX - Other Action, Financial<br/>
                        G1 - Mixed Aggregate<br/>
                    </div>

                    <p><span>Transaction Description</span>: Describes modification, typically covering the effect on the contact.</p>
                </>
            </Accordion>
        </>
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
            <hr className="award-viz__break" />
            {title === "Award History" && content}
        </React.Fragment>
    );
};

AwardSectionHeader.propTypes = AWARD_SECTION_HEADER_PROPS;
export default AwardSectionHeader;
