import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import GlossaryLink from "../../../sharedComponents/GlossaryLink";

const MapDsm = ({ subaward }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const isDefCodeInFilter = reduxFilters?.defCodes?.counts;

    return (
        <>
            <h4>What's included in this view of the data?</h4>
            <p style={{ marginBottom: '8px' }}>
                Use the map to break down spending by state, county, or congressional district.
            </p>
            {subaward ?
                <>
                    {getAtdDefcText(isDefCodeInFilter?.length > 0, true)}
                    <p className="award-search__body-text">
                        The data represent {<span className="award-search__glossary-term"> sub-awards</span>}{' '}{
                            <GlossaryLink term="sub-award" />}{' '}that meet the selected filter criteria. The results do not
                        reflect sub-awards whose
                        {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink
                            term="prime-award" />}
                        {' '}meet the selected filter criteria. For example, if you filter by Place of Performance in
                        your county, you will see only sub-awards with Place of Performance in your county, but you will
                        not see all sub-awards whose prime award lists Place of Performance in your county.
                    </p>
                    <p className="award-search__body-text">
                        Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value
                        of all sub-award amounts for any given prime award is a subset of the Current Award Amount for
                        that prime award; sub-award amounts generally should not exceed the Current Award Amount for
                        their associated prime award. To avoid double-counting the overall value of a prime award, do
                        not sum up sub-award amounts and prime award obligations or outlays.
                    </p>
                </> :
                <>
                    {getAtdDefcText(isDefCodeInFilter?.length > 0, true)}
                    <p className="award-search__body-text">
                        The data in the map represent
                        <span
                            className="award-search__glossary-term"> federal action
                        </span>{' '}<GlossaryLink
                            term="federal-action-obligation" /> {
                            <span
                                className="award-search__glossary-term"> obligation
                            </span>}{' '}{<GlossaryLink
                            term="obligation" />} amounts for non-loan prime award {
                            <span
                                className="award-search__glossary-term"> transactions
                            </span>}{' '}{<GlossaryLink
                            term="transaction" />} within the selected filters. Loan awards use the {
                            <span
                                className="award-search__glossary-term">subsidy cost
                            </span>}{' '}{<GlossaryLink
                            term="loan-subsidy-cost" />} rather than the obligated amount to sum up the value of the loan.
                        Prime award transactions with the same unique award ID are grouped under a single prime award
                        summary.
                    </p>
                </>
            }
            <p>Currently, the table view only displays data for locations that are in view on the map.</p>
            <p style={{ marginTop: '8px' }}>
                <span className="award-search__glossary-term">NOTE: </span>
                Data reported by the Department of Health and Human Services (HHS) related
                to Medicare payments does not reflect the place where "the majority of the work" occurs, as
                required by USAspending's data model specifications. For more information, visit our&nbsp;
                <Link target="_blank" rel="noopener noreferrer" to="/about?section=data-quality">About Page</Link>.
            </p>
        </>
    );
};

export default MapDsm;
