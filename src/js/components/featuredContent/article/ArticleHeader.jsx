/**
 * ArticleHeader.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from 'lodash-es';

const propTypes = {
    image: PropTypes.string,
    mobileImage: PropTypes.string,
    label: PropTypes.string,
    labelColor: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
};

const ArticleHeader = ({
    image, mobileImage, label, labelColor, title, subtitle
}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

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

    return (
        <section className="featured-content__article-header">
            <FlexGridRow className="grid-content">
                <FlexGridCol
                    desktop={6}
                    tablet={0}
                    mobile={0}>
                    <div className="featured-content__column-one">
                        <div className="featured-img-container">
                            <img className="featured-img" src={isMobile ? mobileImage : image} alt="placeholder" />
                        </div>
                    </div>
                </FlexGridCol>
                {/* <FlexGridCol
                    desktop={6}
                    tablet={12}
                    mobile={12}>
                    <div className="training-videos__column-two" >
                        <div className="training-videos__column-two-container">
                            <div className="training-videos__column-two-title">RESOURCES</div>
                            <div className="training-videos__column-two-header">Training Videos</div>
                            <div className="training-videos__column-two-body">Learn how to use USAspending.gov and understand the data. Subscribe to our YouTube channel for the latest videos!</div>
                            <div className="training-video__column-share-icon">
                                <ShareIcon
                                    url={getBaseUrl(slug)}
                                    onShareOptionClick={onShareClick}
                                    colors={{ backgroundColor: "#edf0ff", color: "#2378c3" }}
                                    dropdownDirection={isMobile ? 'right' : 'left'}
                                    classNames="no-margin-left"
                                    noShareText />
                            </div>
                        </div>
                    </div>
                </FlexGridCol> */}
            </FlexGridRow>
        </section>
    );
};
ArticleHeader.propTypes = propTypes;
export default ArticleHeader;
