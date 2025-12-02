/**
 * FeaturedContentCard.jsx
 * Created by Josue Aguilar 10/30/25
 */

import React from 'react';
import { CardBody, CardContainer, CardHero, FlexGridCol } from "data-transparency-ui";
import PropTypes from "prop-types";
import Analytics from "../../../helpers/analytics/Analytics";
import ExternalLink from "../../sharedComponents/ExternalLink";

const trackHomePageLink = ({
    event = 'homepage_featured_content_links',
    category = 'Homepage',
    action = 'Link',
    label
}) => {
    if (label) {
        Analytics.event({
            event,
            category,
            action,
            label
        });
    }
};

const propTypes = {
    url: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    taxonomy: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    externalLink: PropTypes.bool
};

const FeaturedContentCard = ({
    url, title, fill, img, taxonomy, externalLink = false
}) => {
    const Content = () => (
        <CardContainer variant="outline" size="md">
            <CardHero
                fill={fill}
                variant="expanded"
                img={img} />
            <CardBody
                overline={taxonomy?.toUpperCase()}
                headline={
                    <div>
                        {title}
                    </div>
                }>
            </CardBody>
        </CardContainer>
    );

    return (
        <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
            {externalLink ?
                <ExternalLink isCard url={url}>
                    <Content />
                </ExternalLink>
                :
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackHomePageLink(() => trackHomePageLink(
                        { label: title }
                    ))}
                    className="featured-content__section--link" >
                    <Content />
                </a>
            }
        </FlexGridCol>
    );
};

FeaturedContentCard.propTypes = propTypes;
export default FeaturedContentCard;
