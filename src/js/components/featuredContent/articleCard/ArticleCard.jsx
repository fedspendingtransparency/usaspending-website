/**
 * ArticleCard.jsx
 * Created by Andrea Blackwell 12/20/22
 */

import React from 'react';
import PropTypes, { oneOfType } from "prop-types";
import { CardContainer, CardHero, CardBody } from 'data-transparency-ui';
import ArticleThumbnail from './ArticleThumbnail';
import { useIntersectionObserver } from "../../../hooks/hooks";
import Analytics from "../../../helpers/analytics/Analytics";

const propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func,
    onKeyUp: PropTypes.func,
    thumbnailUrl: PropTypes.string,
    publishedAt: PropTypes.string,
    fill: PropTypes.string,
    url: oneOfType([PropTypes.string, PropTypes.func])
};

const ArticleCard = ({
    title, onClick, description, onKeyUp, thumbnailUrl, fill, publishedAt, taxonomy
}) => {
    const onObserve = (isIntersecting) => {
        if (isIntersecting) {
            Analytics.event({
                event: 'award_history_table_tab',
                category: 'Award Page',
                action: 'Subaward Table',
                label: `${this.props.awardId}`
            });
        }
    };

    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.75,
        freezeOnceVisible: true,
        onChange: () => onObserve(isIntersecting)
    });

    let changedTitle;
    let overline;

    const titleIndex = title.indexOf(":");

    if (titleIndex > 0 && (titleIndex + 2) < title.length) {
        changedTitle = title.substring(titleIndex + 2);
        overline = title.substring(0, titleIndex);
    }
    else {
        changedTitle = title;
        overline = taxonomy.toUpperCase();
    }

    return (
        <div ref={ref}>
            <CardContainer variant="outline" size="md" tabIndex="0">
                <CardHero
                    variant="expanded"
                    thumbnail
                    fill={fill}
                    onClick={onClick}
                    onKeyUp={onKeyUp}>
                    <ArticleThumbnail
                        thumbnailUrl={thumbnailUrl}
                        title={changedTitle} />
                </CardHero>
                <CardBody
                    overline={overline}
                    headline={
                        <div>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                            <div className="video-card__headline" onClick={onClick} >
                                {changedTitle}
                            </div>
                        </div>
                    }
                    text={description}>
                    <div className="list-of-articles__inline">
                        <div className="article-card__metadiv">
                            {publishedAt}
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </div>
    );
};

ArticleCard.propTypes = propTypes;

export default ArticleCard;
