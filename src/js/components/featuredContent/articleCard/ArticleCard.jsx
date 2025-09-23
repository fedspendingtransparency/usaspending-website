/**
 * ArticleCard.jsx
 * Created by Andrea Blackwell 12/20/22
 */

import React, { useState, useEffect } from 'react';
import PropTypes, { oneOfType } from "prop-types";
import { CardContainer, CardHero, CardBody } from 'data-transparency-ui';
import { useDispatch } from 'react-redux';
import { handleShareOptionClick } from 'helpers/socialShare';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from 'lodash-es';
import ArticleThumbnail from './ArticleThumbnail';
import { showModal } from '../../../redux/actions/modal/modalActions';

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
    title, onClick, description, onKeyUp, url, thumbnailUrl, fill, publishedAt
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const dispatch = useDispatch();
    const handleShareDispatch = (e) => {
        dispatch(showModal(e));
    };
    const onShareClick = (name) => {
        const emailSubject = `${title}`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Watch this video about USAspending.gov: ${url}`
        };
        handleShareOptionClick(name, url, emailArgs, handleShareDispatch);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    let changedTitle;
    let overline;
    const titleIndex = title.indexOf(":");

    if (titleIndex > 0 && (titleIndex + 2) < title.length) {
        changedTitle = title.substring(titleIndex + 2);
        overline = title.substring(0, titleIndex);
    }
    else {
        changedTitle = title;
        overline = "RESOURCE";
    }
    return (
        <CardContainer variant="outline" size="md" tabIndex="0">
            <CardHero
                variant="expanded"
                thumbnail
                fill={fill}
                onClick={onClick}>
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
    );
};

ArticleCard.propTypes = propTypes;

export default ArticleCard;
