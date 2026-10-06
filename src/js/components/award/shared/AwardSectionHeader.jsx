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
    left = true,
    category,
    activeTab
}) => {
    const accordionTitle = <div className="action-type accordion-title"><FontAwesomeIcon icon="circle-info" /><span>Show Column Info</span></div>;

    const awardAccordionContent = (<div>
        <p><span className="label">Modification Number:</span> Identifies the modification. Modification number increment from lower to higher as more mods  are made.</p>
        <p><span className="label">Action Date:</span> When the modification was issued.</p>
        <p><span className="label">Amount:</span> The amount of money added or subtracted from the initial awarded amounts by the modification, if any.</p>
        {category === "loan" && title.includes("Award History") &&
         <>
             <p>
                 <span className="label">Loan Face Value: </span>
                 Represents how much has been lent out to the entity that received the loan dollars. Sometimes loans are financed by a financial institution (with the Federal government merely providing a 'loan guarantee' to the financial institution and reimbursement in cases where the loan isn't paid back), and other times they are financed by the Federal government directly (direct loans). Regardless of how it is financed, a loan's face value is not considered Federal spending, because it does not represent a long-term cost to the government. The estimated long-term cost to the government of a loan is captured in the subsidy cost field.
             </p>
             <p>
                 <span className="label">Loan Subsidy Cost (Total Obligations To Date): </span>
                 The implications of a loan or loan guarantee for the Federal Budget (and thus the loan version of spending/obligations) are known as the loan's subsidy cost. Subsidy cost is the calculated net present value of the loan to the government, taking into account the interest rate and the modeled risk of the recipient failing to pay back the loan in part or full; subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Subsidy cost should never be larger in absolute value terms than the face value itself. Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations. Note that a loan's face value is not considered Federal spending, since it does not in itself represent a long-term cost to the government.
             </p>
         </>
        }

        <div className="accordion-body-copy__action-type">
            <span className="label">Action Type: </span>
            Describes the type of modification. It uses a letter cord system that maps to the following descriptions:
            <br/>
            A 1 - New Award<br/>
            B 1 - Continuation<br/>
            EX - Other Action, Non-Financial<br/>
            FX - Other Action, Financial<br/>
            G1 - Mixed Aggregate<br/>
        </div>

        <p><span className="label">Transaction Description: </span> Describes modification, typically covering the effect on the contact.</p>
    </div>);

    const subawardAccordionContent = (<div>
        <p><span className="label">Sub-Award ID: </span> The sub-award ID number chosen by the prime recipient for this transaction.</p>
        <p><span className="label">Recipient Name: </span> The name of the sub recipient.</p>
        <p><span className="label">Action Date: </span> The date the sub-contract was issued.</p>
        <p><span className="label">Amount: </span> The amount of money involved in the sub-contract action.</p>
        <p><span className="label">Sub-Award Description: </span> The description of the sub-contract provided by the prime recipient. The level of detail in descriptions varies and is dependent on the author.</p>
    </div>);

    const content = (
        <div className="accordion-body-copy">
            <p>This section displays the awards:</p>
            <p><span>Transaction History </span>- Displays modification records for an award. Each modification appears as a row in the table below.</p>
            <p><span>Sub-Awards </span>- Displays any sub-contracts reported by this contract&#39;s recipient (the &#39;prime recipient&#39; in the sub-award context). Sub-contracts are contractual agreements that a prime recipient makes with another entity (sub-recipient) to furnish supplies or services for the prime contract. Above the Sub-Award table, we display the total number of reported sub-contract actions and their total value.</p><p><span>Federal Account Funding </span>- Each row in this table shows a transaction in the awarding agency&#39;s financial system that promises spending for the award from a federal account (a rollup of TAS, or Treasury accounts), broken down by program activity and object class.</p>
            <Accordion
                title={accordionTitle}>
                {activeTab === "subaward" ? subawardAccordionContent : awardAccordionContent}
            </Accordion>
        </div>
    );
    return (
        <React.Fragment>
            <div className="award-viz__heading">
                {icon && <div className="award-viz__icon">{icon}</div>}
                <h3 className="award-viz__title">{title}</h3>
                {tooltip && !title.includes("Award History") &&
                //TODO: TooltipWrapper may be able to remove?
                <TooltipWrapper
                    className="award-section-tt"
                    icon="info"
                    tooltipPosition={left ? 'left' : 'right'}
                    wide={tooltipWide}
                    tooltipComponent={tooltip} />}
            </div>
            <hr className="award-viz__break" />
            {title.includes("Award History") && content}
        </React.Fragment>
    );
};

AwardSectionHeader.propTypes = AWARD_SECTION_HEADER_PROPS;
export default AwardSectionHeader;
