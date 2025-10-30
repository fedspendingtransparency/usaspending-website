/**
 * FeaturedContent.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol, CardContainer, CardHero, CardBody } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';
import { marketingArticle, otherArticle } from "../../../helpers/homepageFeaturedContentHelper";

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

// TODO: pull out home page cards

const propTypes = {
    leftCard: PropTypes.shape({
        url: PropTypes.string.isRequired,
        fill: PropTypes.string.isRequired,
        thumbnail_path: PropTypes.string.isRequired,
        taxonomy: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }),
    rightCard: PropTypes.shape({
        url: PropTypes.string.isRequired,
        fill: PropTypes.string.isRequired,
        thumbnail_path: PropTypes.string.isRequired,
        taxonomy: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })
};

const FeaturedContent = ({ leftCard = marketingArticle, rightCard = otherArticle }) => (
    <section className="featured-content__section">
        <div className="featured-content__heading">
            <div className="featured-content__heading--background">
                <FontAwesomeIcon className="featured-content__heading--icon" icon="bullhorn" />
            </div>
            <span>Featured Content</span>
        </div>
        <div className="featured-content__section--flex-row">
            <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                <a
                    href={leftCard.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackHomePageLink(() => trackHomePageLink(
                        { label: rightCard.title }
                    ))}
                    className="featured-content__section--link" >
                    <CardContainer variant="outline" size="md">
                        <CardHero
                            fill={leftCard.fill}
                            variant="expanded"
                            img={leftCard.thumbnail_path} />
                        <CardBody
                            overline={leftCard.taxonomy.toUpperCase()}
                            headline={
                                <div>
                                    {leftCard.title}
                                </div>
                            }>
                        </CardBody>
                    </CardContainer>
                </a>
            </FlexGridCol>
            <FlexGridCol width={12} desktop={6} tablet={6} mobile={12}>
                <a
                    href={rightCard.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackHomePageLink(
                        { label: rightCard.title }
                    )}
                    className="featured-content__section--link" >
                    <CardContainer variant="outline" size="md">
                        <CardHero
                            fill={rightCard.fill}
                            variant="expanded"
                            img={rightCard.thumbnail_path} />
                        <CardBody
                            overline={rightCard.taxonomy.toUpperCase()}
                            headline={
                                <div>
                                    {rightCard.title}
                                </div>
                            }>
                        </CardBody>
                    </CardContainer>
                </a>
            </FlexGridCol>
        </div>
    </section>);

FeaturedContent.propTypes = propTypes;
export default FeaturedContent;
