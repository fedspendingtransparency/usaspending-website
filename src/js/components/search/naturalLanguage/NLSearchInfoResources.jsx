/**
 * NLSearchInfoResources.jsx
 * Created by Trey Morgan 09/29/2026
 */

import React from 'react';
import { FlexGridRow, FlexGridCol, CardContainer, CardBody, CardButton} from 'data-transparency-ui';
import { smartAssistResources } from '../naturalLanguage/NLData';

const NLSearchInfoResources = () => {
    return (
        <section className="search-info-page__additional-resources">
            <FlexGridCol className="search-info-page__resources-label">
                Additional Resources
            </FlexGridCol>
            <FlexGridCol className="search-info-page__resources-text">
                Other resources available to help you understand the data in USAspending.
            </FlexGridCol>
            <FlexGridRow className="search-info-page__resources-card-row">
                {smartAssistResources.map((card, index) => (
                    <FlexGridCol
                        className="search-info-page__resources-card-col"
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        mobile={12}
                        tablet={12}
                        desktop={4}>
                        <CardContainer>
                            {card.icon}
                            <CardBody
                                headline={card.headline}
                                text={card.text}>
                                <CardButton
                                    variant="text"
                                    backgroundColor="light"
                                    textAlignment="left"
                                    text={card.buttonText}
                                    link={card.buttonLink}
                                    govLink={card.govLink}
                                    onlyPerformAction={card.onlyPerformAction}
                                    action={card.action}>
                                </CardButton>
                            </CardBody>
                        </CardContainer>
                    </FlexGridCol>
                ))}
            </FlexGridRow>
        </section>
    );
};

export default NLSearchInfoResources;
