import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

const totalPropTypes = {
    total: PropTypes.string
};

const fileCProps = {
    total: PropTypes.string,
    awardType: PropTypes.string,
    title: PropTypes.string
};

export const FileCOutlayTooltip = ({ total, awardType, title = "COVID-19 Outlayed Amount" }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">{title}</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        {awardType === 'contract' && (
            <div className="tooltip__text">
                <p>Out of the amount obligated by this award as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19, this amount is how much was actually paid to the recipient to date. The timing of outlays (i.e., actual payments) against their obligations (i.e., promises for payment) is determined by the terms of the contract and invoices from the contractor.</p>
                <p>This amount is updated on a monthly basis.</p>
            </div>
        )}
        {awardType === 'idv' && (
            <div className="tooltip__text">
                <p>Out of the amount obligated by this award as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19, this amount is how much was actually paid to the recipient to date. The timing of outlays (i.e., actual payments) against their obligations (i.e., promises for payment) is determined by the terms of the contract and invoices from the contractor.</p>
                <p>
                    This amount includes all the award orders underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* nested under a child IDV order* (if any). This amount does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.
                </p>
                <ul className="tooltip__list">
                    <li><strong>*Child award order</strong> refers to award orders made directly under this IDV (IDV &gt; Award).</li>
                    <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
                    <li><strong>*Grandchild award order</strong> refers to award orders made within a child IDV order (IDV &gt; IDV &gt; Award).</li>
                    <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
                </ul>
            </div>
        )}
        {awardType === 'asst' && (
            <div className="tooltip__text">
                <p>Out of the amount obligated by this award as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19, this amount is how much was actually paid to the recipient to date. The timing of outlays (i.e., actual payments) against their obligations (i.e., promises for payment) is determined by the terms of the award.</p>
                <p>This amount is updated on a monthly basis.</p>
            </div>
        )}
        {awardType === 'loan' && (
            <div className="tooltip__text">
                <p>Out of the amount obligated by this award (for loans, total subsidy cost) as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19, this amount is how much was actually paid to the recipient to date. The timing of outlays (i.e., actual payments) against their obligations (i.e., promises for payment) is determined by the terms of the award.</p>
                <p>This amount is updated on a monthly basis.</p>
            </div>
        )}
    </div>
);

FileCOutlayTooltip.propTypes = totalPropTypes;

export const FileCObligatedTooltip = ({ total, awardType, title = "COVID-19 Obligated Amount" }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">{title}</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        {awardType === 'contract' && (
            <div className="tooltip__text">
                <p>Out of the total amount obligated by this award, this amount is how much was obligated as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19. An obligation represents a binding promise by the government to pay the recipient, assuming the recipient fulfills all of its commitments.
                </p>
                <p>This amount is updated on a monthly basis.</p>
            </div>
        )}
        {awardType === 'idv' && (
            <>
                <div className="tooltip__text">
                    <p>Out of the total amount obligated by this award, this amount is how much was obligated as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19. An obligation represents a binding promise by the government to pay the recipient, assuming the recipient fulfills all of its commitments.</p>
                    <p>This amount includes all the award orders underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* nested under a child IDV order* (if any). This amount does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
                </div>
                <ul className="tooltip__list">
                    <li><strong>*Child award order</strong> refers to award orders made directly under this IDV (IDV &gt; Award).</li>
                    <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
                    <li><strong>*Grandchild award order</strong> refers to award orders made within a child IDV order (IDV &gt; IDV &gt; Award).</li>
                    <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
                </ul>
            </>
        )}
        {awardType === 'asst' && (
            <div className="tooltip__text">
                <p>Out of the total amount obligated by this award, this amount is how much was obligated as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19. An obligation represents a binding promise by the government to pay the recipient, assuming the recipient fulfills all of its commitments (if applicable).</p>
                <p>This amount is updated on a monthly basis.</p>
            </div>
        )}
        {awardType === 'loan' && (
            <div className="tooltip__text">
                <p>
                    Out of the total amount obligated by this award (for loans, total subsidy cost), this amount is how much was obligated as part of the CARES Act and supplemental legislation in response to the coronavirus COVID-19. An obligation represents a binding promise by the government to pay the recipient, assuming the recipient fulfills all of its commitments (if applicable).
                </p>
                <p>This amount is updated on a monthly basis.</p>
            </div>
        )}
    </div>
);

FileCObligatedTooltip.propTypes = totalPropTypes;

export const ObligatedAmountTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Obligated Amount</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This is the amount that has been obligated in an agency’s financial system for this award. An obligation represents a binding promise by the government to pay the recipient, assuming the recipient fulfills all of its commitments.</p>
        </div>
    </div>
);

ObligatedAmountTooltip.propTypes = totalPropTypes;

export const ObligatedAmountTooltipAsst = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Obligated Amount</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This is the amount that has been obligated, or promised by the government, to be paid to the recipient, assuming the recipient fulfills all its commitments.</p>
        </div>
    </div>
);

ObligatedAmountTooltipAsst.propTypes = totalPropTypes;

export const CurrentAmountTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Current Award Amount</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This is the total amount that will be paid out to the recipient if it fulfills all its commitments under the currently-exercised options of this contract. If additional options are exercised, this amount will change accordingly. This usually matches the Obligated Amount, but certain agencies (e.g., DOD) are allowed to incrementally fund some contracts in their financial systems. In these cases, the Obligated Amount may lag behind the Current Award Amount.</p>
        </div>
    </div>
);

CurrentAmountTooltip.propTypes = totalPropTypes;

export const PotentialAmountTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Potential Award Amount</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This is the potential amount that will be paid out to the recipient if all of the contract options are exercised and the recipient fulfills all of its duties under the base contract and these options. This amount is sometimes referred to as the ceiling or capacity of the contract.</p>
        </div>
    </div>
);

PotentialAmountTooltip.propTypes = totalPropTypes;

export const ExceedsCurrentAmountTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Exceeds Current Award Amount</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This contract has a total obligated amount that exceeds its Current Award Amount. In other words, more money has been obligated to this award than should be possible based on the value of the base and exercised options of the contract.</p>
            <p>Such over-obligation can occur because of missing data, errors in the data, or violations of procurement policy.</p>
        </div>
    </div>
);

ExceedsCurrentAmountTooltip.propTypes = totalPropTypes;

export const ExceedsPotentialAmountTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Exceeds Potential Award Amount</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This contract has a total obligated amount that exceeds its Potential Award Amount. In other words, more money has been obligated to this award than should be possible based on the potential value of the contract if all options are exercised and all expected goods or services are delivered (i.e., the base contract and exercised options).</p>
            <p>Such over-obligation can occur because of missing data, errors in the data, or violations of procurement policy.</p>
        </div>
    </div>
);

ExceedsPotentialAmountTooltip.propTypes = totalPropTypes;

export const TotalFundingTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Total Funding</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This is the sum of the federal action obligation and the non-federal funding amounts.</p>
        </div>
    </div>
);

TotalFundingTooltip.propTypes = totalPropTypes;

export const NonFederalFundingTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Non-Federal Funding</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>This is the amount funded by any non-federal source(s).</p>
        </div>
    </div>
);

NonFederalFundingTooltip.propTypes = totalPropTypes;

export const SubsidyTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Original Subsidy Cost</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>The total estimated long-term cost to the Government of the direct loan or loan guarantee, excluding administrative costs.</p>
        </div>
    </div>
);

SubsidyTooltip.propTypes = totalPropTypes;

export const FaceValueTooltip = ({ total }) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Face Value of Direct Loan or Loan Guarantee</h4>
        <h5 className="tooltip__amount--loans">{total}</h5>
        <div className="tooltip__text">
            <p>The full amount of the loan/loan guarantee awarded to the recipient.</p>
        </div>
    </div>
);

FaceValueTooltip.propTypes = totalPropTypes;

// IDVs:
export const CombinedObligatedAmounts = ({
    total,
    count
}) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Combined Obligated Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>This amount is how much money has been obligated, or promised by the government, to be paid to the recipients for all the award orders underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* nested under a child IDV order* (if any). This does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
        </div>
        <ul className="tooltip__list">
            <li><strong>*Child award order</strong> refers to award orders made directly under this IDV (IDV &gt; Award).</li>
            <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
            <li><strong>*Grandchild award order</strong> refers to award orders made within a child IDV order (IDV &gt; IDV &gt; Award).</li>
            <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
        </ul>
    </div>
);

CombinedObligatedAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedCurrentAmounts = ({
    total,
    count
}) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Combined Current Award Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>Collectively, this is how much money is currently available across all award orders made underneath this indefinite delivery vehicle (IDV), including both child award orders* and grandchild award orders* made under a child IDV order* (if any).  The maximum amount available is calculated by adding the “Total Base & Exercised Options” amount (also known as the contract ceiling amount or current award amount) across each award order underneath this IDV. This does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
        </div>
        <ul className="tooltip__list">
            <li><strong>*Child award order</strong> refers to award orders made directly under this IDV (IDV &gt; Award).</li>
            <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
            <li><strong>*Grandchild award order</strong> refers to award orders made within a child IDV order (IDV &gt; IDV &gt; Award).</li>
            <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
        </ul>
    </div>
);

CombinedCurrentAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedPotentialAmounts = ({
    total,
    count
}) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Combined Potential Award Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>This is the collective potential award amount of all of the award orders underneath this indefinite delivery vehicle (IDV), if all contract options are exercised.  You can think of this as the collective maximum award amount of all of the award orders made underneath this IDV, or the total award capacity of this IDV. This does not include obligations directly attached to any child IDV orders*, or to the IDV itself*.</p>
        </div>
        <ul className="tooltip__list">
            <li><strong>*Child IDV order</strong> refers to IDVs made directly under this IDV (IDV &gt; IDV).</li>
            <li><strong>*IDV itself</strong> refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders.</li>
        </ul>
    </div>
);

CombinedPotentialAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedExceedsPotentialAmounts = ({
    total,
    count
}) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Exceeds Combined Potential Award Amounts</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>The award orders made underneath this indefinite delivery vehicle (IDV) have a combined obligated amount that exceeds their combined potential award amounts. In other words, collectively speaking, the award orders underneath this IDV have obligated more money than what is ultimately available to spend if all options are exercised (their combined potential award amount).</p>
            <p>This can occur because of missing data, errors in the data, or violations of procurement policy.</p>
        </div>
    </div>
);

CombinedExceedsPotentialAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

export const CombinedExceedsCurrentAmounts = ({
    total,
    count
}) => (
    <div className="award-amounts-tt">
        <h4 className="tooltip__title">Exceeds Combined Current Award Amount</h4>
        <h5 className="tooltip__amount"><span>{total}</span> from <span>{`${count} award orders`}</span></h5>
        <div className="tooltip__text">
            <p>The award orders underneath this indefinite delivery vehicle (IDV) have a combined obligated amount that exceeds their combined current award amount. In other words, collectively speaking, the award orders under this IDV have obligated more money than what was made available to spend at this time (their combined current award amounts or combined contract ceilings).</p>
            <p>This can occur because of missing data, errors in the data, or violations of procurement policy.</p>
        </div>
    </div>
);

CombinedExceedsCurrentAmounts.propTypes = {
    total: PropTypes.string,
    count: PropTypes.number
};

ObligatedAmountTooltip.propTypes = propTypes;
CurrentAmountTooltip.propTypes = propTypes;
PotentialAmountTooltip.propTypes = propTypes;
FileCObligatedTooltip.propTypes = fileCProps;
FileCOutlayTooltip.propTypes = fileCProps;

export const getTooltipPropsByAwardTypeAndSpendingCategory = (type, category, data = {}) => {
    const map = {
        idv: {
            obligated: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedObligatedAmounts total={data.totalObligationFormatted} count={data.childAwardCount} />
            },
            current: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedCurrentAmounts total={data.baseExercisedOptionsFormatted} count={data.childAwardCount} />
            },
            potential: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedPotentialAmounts total={data.baseAndAllOptionsFormatted} count={data.childAwardCount} />
            },
            exceedsCurrent: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedExceedsCurrentAmounts total={data.overspendingFormatted} count={data.childAwardCount} />
            },
            exceedsPotential: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CombinedExceedsPotentialAmounts total={data.extremeOverspendingFormatted} count={data.childAwardCount} />
            },
            fileCObligated: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCObligatedTooltip total={data.fileCObligatedFormatted} awardType="idv" />
            },
            fileCOutlay: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCOutlayTooltip total={data.fileCOutlayFormatted} awardType="idv" />
            }
        },
        contract: {
            fileCOutlay: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCOutlayTooltip total={data.fileCOutlayFormatted} awardType="contract" />
            },
            fileCObligated: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCObligatedTooltip total={data.fileCObligatedFormatted} awardType="contract" />
            },
            obligated: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <ObligatedAmountTooltip total={data.totalObligationFormatted} />
            },
            current: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <CurrentAmountTooltip total={data.baseExercisedOptionsFormatted} />
            },
            potential: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <PotentialAmountTooltip total={data.baseAndAllOptionsFormatted} />
            },
            exceedsCurrent: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <ExceedsCurrentAmountTooltip total={data.overspendingFormatted} />
            },
            exceedsPotential: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <ExceedsPotentialAmountTooltip total={data.extremeOverspendingFormatted} />
            }
        },
        loan: {
            subsidy: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <SubsidyTooltip total={data.subsidyFormatted} />
            },
            faceValue: {
                offsetAdjustments: { top: -7 },
                tooltipComponent: <FaceValueTooltip total={data.faceValueFormatted} />
            },
            fileCObligated: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCObligatedTooltip total={data.fileCObligatedFormatted} awardType="loan" />
            },
            fileCOutlay: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCOutlayTooltip total={data.fileCOutlayFormatted} awardType="loan" />
            }
        },
        asst: {
            obligated: {
                offsetAdjustments: { top: -7 },
                tooltipComponent: <ObligatedAmountTooltipAsst total={data.totalObligationFormatted} />
            },
            nonFederalFunding: {
                offsetAdjustments: { top: -10, right: 0 },
                tooltipComponent: <NonFederalFundingTooltip total={data.nonFederalFundingFormatted} />
            },
            totalFunding: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <TotalFundingTooltip total={data.totalFundingFormatted} />
            },
            fileCObligated: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCObligatedTooltip total={data.fileCObligatedFormatted} awardType="asst" />
            },
            fileCOutlay: {
                offsetAdjustments: { top: 0 },
                tooltipComponent: <FileCOutlayTooltip total={data.fileCOutlayFormatted} awardType="asst" />
            }
        }
    };
    if (Object.keys(map).includes(type)) {
        return {
            className: 'award-amounts-tt__wrapper',
            ...map[type][category]
        };
    }
    return {
        className: 'award-amounts-tt__wrapper',
        ...map.asst[category]
    };
};
