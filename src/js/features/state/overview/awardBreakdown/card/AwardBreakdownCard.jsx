import React from "react";
import { CardBody, CardContainer, CardHero, FlexGridCol } from "data-transparency-ui";
import PropTypes from "prop-types";

import AwardBreakdownCardHeadline from "./AwardBreakdownCardHeadline";
import AwardBreakdownCardButton from "./AwardBreakdownCardButton";

const propTypes = {
    overview: PropTypes.object
};

const AwardBreakdownCard = ({ overview }) => {
    let populationSourceYearLabel = '';
    let incomeSourceYearLabel = '';
    const {
        code,
        name,
        type,
        population,
        populationSourceYear,
        incomeSourceYear,
        awardAmountPerCapita,
        medianHouseholdIncome
    } = overview;

    if ((population !== "--") && populationSourceYear) {
        populationSourceYearLabel = `(${populationSourceYear} est.)`;
    }
    if ((medianHouseholdIncome !== "--") && incomeSourceYear) {
        incomeSourceYearLabel = `(${incomeSourceYear} est.)`;
    }

    const text = (
        <div className="details-info">
            <div className="details-header">Count</div>
            <div className="details-text">
                {population} {populationSourceYearLabel}
            </div>
            <div className="details-header">Obligations Per Capita</div>
            <div className="details-text">
                {awardAmountPerCapita}
            </div>
            <div className="details-header">Median Household Income</div>
            <div className="details-text">
                {medianHouseholdIncome} {incomeSourceYearLabel}
            </div>
        </div>
    );

    return (
        <FlexGridCol width={4} desktop={4} tablet={12} mobile={12}l>
            <div className="state-section__viz details state-overview__heading">
                <CardContainer variant="outline" size="md">
                    <CardHero fill="#005ea2" />
                    <CardBody
                        customClassName="details-card-body"
                        headline={<AwardBreakdownCardHeadline />}
                        text={text}>
                        <AwardBreakdownCardButton code={code} type={type} name={name} />
                    </CardBody>
                </CardContainer>
            </div>
        </FlexGridCol>
    );
};

AwardBreakdownCard.propTypes = propTypes;
export default AwardBreakdownCard;
