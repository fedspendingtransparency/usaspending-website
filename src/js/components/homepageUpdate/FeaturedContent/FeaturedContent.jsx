/**
 * FeaturedContent.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridCol, CardContainer, CardHero, CardBody } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Analytics from 'helpers/analytics/Analytics';
import articles from "../../../../config/featuredContent/featuredContentMetadata";
import { transformString } from "../../../helpers/featuredContent/featuredContentHelper";


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

const date = new Date();
// TODO: uncomment after testing
// const firstFeaturedContentDay = new Date(2025, 10, 12);
const firstFeaturedContentDay = new Date(2025, 9, 19);
const weekDifference = Math.ceil(((date - firstFeaturedContentDay) / 604800000));
const featureSprintNum = Math.ceil(weekDifference / 3);
const featureWeekNum = weekDifference - ((featureSprintNum - 1) * 3);

const currentArticles = articles.filter((article) => article.feature_sprint === featureSprintNum);

const partition = (array, isValid) => array.reduce(
    ([pass, fail], elem) => (isValid(elem) ?
        [[...pass, elem], fail] :
        [pass, [...fail, elem]]), [[], []]
);

const [marketingArticles, otherArticles] = partition(
    currentArticles,
    (article) => article.content_type === 'Marketing'
);
const currentMarketingArticle = marketingArticles[0];
const currentOtherArticle = otherArticles[featureWeekNum - 1];

const [marketingArticle, otherArticle] = [currentMarketingArticle, currentOtherArticle]
    .map((article) => {
        const titleIndex = article.title.indexOf(":");

        if (titleIndex > 0 && (titleIndex + 2) < article.title.length) {
            return {
                url: `/featured-content/${
                    transformString(currentMarketingArticle.taxonomy)
                }/${transformString(currentMarketingArticle.title)}`,
                title: article.title.substring(titleIndex + 2),
                overline: article.title.substring(0, titleIndex),
                ...article
            };
        }

        return {
            url: `/featured-content/${
                transformString(currentMarketingArticle.taxonomy)
            }/${transformString(currentMarketingArticle.title)}`,
            overline: article.taxonomy.toUpperCase(),
            ...article
        };
    });

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
export default FeaturedContent;
