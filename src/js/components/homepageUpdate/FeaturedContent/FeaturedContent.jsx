/**
 * FeaturedContent.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

import getCurrentArticles from "../../../helpers/homepageFeaturedContentHelper";
import FeaturedContentCard from "./FeaturedContentCard";

const [marketingArticle, otherArticle] = getCurrentArticles();

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
            <FeaturedContentCard
                url={leftCard.url}
                title={leftCard.title}
                fill={leftCard.fill}
                img={leftCard.thumbnail_path}
                taxonomy={leftCard.taxonomy}
                externalLink={leftCard?.externalLink} />
            <FeaturedContentCard
                url={rightCard.url}
                title={rightCard.title}
                fill={rightCard.fill}
                img={rightCard.thumbnail_path}
                taxonomy={rightCard.taxonomy}
                externalLink={rightCard?.externalLink} />
        </div>
    </section>);

FeaturedContent.propTypes = propTypes;
export default FeaturedContent;
