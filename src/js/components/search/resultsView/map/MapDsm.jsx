import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import GlossaryLink from "../../../sharedComponents/GlossaryLink";
import GlobalConstants from "../../../../GlobalConstants";
import AboutTheDataLink from "../../../sharedComponents/AboutTheDataLink";

const MapDsm = ({ spendingLevel }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);
    const isDefCodeInFilter = reduxFilters?.defCodes?.counts;
    const [displayCopy, setDisplayCopy] = useState();
    const { pathname } = useLocation();

    const v2Copy = <>
        <h4>What's included in this view of the data?</h4>
        <p style={{ marginBottom: '8px' }}>
            Use the map to break down spending by state, county, or congressional district.
        </p>
        { spendingLevel === 'subawards' ?
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
                <p className="award-search__body-text">Sub-award amounts are funded by prime award obligations and outlays.
                    In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award;
                    sub-award amounts generally should not exceed the Current Award Amount for their associated prime award.
                    To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                <span className="award-search__subaward-note">
                    Note that there are several documented issues related to&nbsp;
                    <AboutTheDataLink slug="subaward-data-quality">
                        subaward data quality
                    </AboutTheDataLink>
                </span>
                {' '}in our About the Data module.
                </p>
            </> :
            <>
                {getAtdDefcText(isDefCodeInFilter?.length > 0, true)}
                <p className="award-search__body-text">
                    The data in the map represent
                    {<span className="award-search__glossary-term"> federal action</span>}
                    {' '}{<GlossaryLink term="federal-action-obligation" />}
                    {<span className="award-search__glossary-term"> obligation</span>}
                    {' '}{<GlossaryLink term="obligation" />} amounts for non-loan prime award summaries within the selected filters. Loan awards use the
                    {<span className="award-search__glossary-term"> subsidy cost</span>}
                    {' '}{<GlossaryLink term="loan-subsidy-cost" />} rather than the obligated amount to sum up the
                    {<span className="award-search__glossary-term"> value of the loan</span>}
                    {' '}{<GlossaryLink term="face-value-of-loan" />}.
                </p>
            </>
        }
        <p>Currently, the table view only displays data for locations that are in view on the map.</p>
        <p style={{ marginTop: '8px' }}>
            <span className="award-search__glossary-term">NOTE: </span>
            Data reported by the Department of Health and Human Services (HHS) related
            to Medicare payments does not reflect the place where "the majority of the work" occurs, as
            required by USAspending's data model specifications. &nbsp;
            <AboutTheDataLink slug="medicare-location-data">
                Learn about Medicare Location Data.
            </AboutTheDataLink>
        </p>
    </>;

    const legacyCopy = <>
        <h4>What's included in this view of the data?</h4>
        <p style={{ marginBottom: '8px' }}>
            Use the map to break down spending by state, county, or congressional district.
        </p>
        { spendingLevel === 'subawards' ?
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
                <p className="award-search__body-text">Sub-award amounts are funded by prime award obligations and outlays.
                    In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award;
                    sub-award amounts generally should not exceed the Current Award Amount for their associated prime award.
                    To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                <span className="award-search__subaward-note">
                    Note that there are several documented issues related to&nbsp;
                    <AboutTheDataLink slug="subaward-data-quality">
                        subaward data quality
                    </AboutTheDataLink>
                    {' '}in our About the Data module.
                </span>
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
            required by USAspending's data model specifications. &nbsp;
            <AboutTheDataLink slug="medicare-location-data">
                Learn about Medicare Location Data.
            </AboutTheDataLink>
        </p>
    </>;

    useEffect(() => {
        if (pathname === GlobalConstants.SEARCH_V2_PATH) {
            setDisplayCopy(v2Copy);
        }
        else {
            setDisplayCopy(legacyCopy);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>{displayCopy}</>);
};

export default MapDsm;
